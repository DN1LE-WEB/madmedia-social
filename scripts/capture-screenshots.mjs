/**
 * Captures homepage screenshots of client sites for the /work page.
 *
 * Usage: npm run screenshots
 *
 * Writes public/work/{slug}-desktop.png at 1440x900. If a site is
 * unreachable, the existing image (if any) is kept and the script
 * still exits 0 so it can never fail a build.
 */
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const SITES = [
  { slug: 'isd2342', url: 'https://isd2342.org' },
  { slug: 'rockin-w-hatbar', url: 'https://rockin-w-hatbar.com' },
  { slug: 'four-pawsresort', url: 'https://four-pawsresort.com' },
  { slug: 'themainmadison', url: 'https://themainmadison.com' },
]

const VIEWPORT = { width: 1440, height: 900 }
const SETTLE_MS = 2500

const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'work')

// Close announcement/newsletter popups so they don't cover the hero
async function dismissPopups(page) {
  const viewport = page.viewportSize()
  const candidates = page
    .getByRole('button', { name: /^(close|dismiss|no thanks|×|✕)$/i })
    .or(page.locator('[aria-label="Close" i]'))
  const count = await candidates.count()
  for (let i = 0; i < Math.min(count, 5); i++) {
    const button = candidates.nth(i)
    try {
      if (!(await button.isVisible())) continue
      const box = await button.boundingBox()
      // Skip full-screen modal backdrops that also carry a Close label
      if (!box || box.width > viewport.width * 0.8) continue
      await button.click({ timeout: 2_000 })
      await page.waitForTimeout(500)
      return
    } catch {
      // Not clickable — try the next candidate
    }
  }
}

async function capture(browser, { slug, url }) {
  const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 2 })
  const page = await context.newPage()
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45_000 })
    // Extra settle time so hero images and web fonts finish rendering
    await page.waitForTimeout(SETTLE_MS)
    await dismissPopups(page)
    const file = path.join(outDir, `${slug}-desktop.png`)
    await page.screenshot({ path: file })
    console.log(`✓ ${slug} → ${path.relative(process.cwd(), file)}`)
  } catch (err) {
    console.warn(`⚠ Skipped ${slug} (${url}): ${err.message.split('\n')[0]}`)
    console.warn('  Keeping the existing image if one exists.')
  } finally {
    await context.close()
  }
}

async function main() {
  await mkdir(outDir, { recursive: true })
  let browser
  try {
    browser = await chromium.launch()
  } catch (err) {
    console.warn(`⚠ Could not launch browser, skipping all captures: ${err.message.split('\n')[0]}`)
    return
  }
  for (const site of SITES) {
    await capture(browser, site)
  }
  await browser.close()
}

main()
  .catch((err) => {
    console.warn(`⚠ Screenshot run failed: ${err.message}`)
  })
  .finally(() => {
    process.exitCode = 0
  })
