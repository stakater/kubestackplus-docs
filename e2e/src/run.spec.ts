import { test, expect } from '@playwright/test';

const selectors = {
  consentDialog: '#__consent',
  consentControlsDiv: '.md-consent__controls',
  acceptButtonText: 'Accept',
  searchInput: 'input.md-search__input[placeholder="Search"]',
  searchResultItem: 'li.md-search-result__item',
  searchLabel: 'label.md-header__button.md-icon[for="__search"]',
};

async function acceptConsentIfPresent(page) {
  const accept = page.locator(`${selectors.consentControlsDiv} button:has-text("${selectors.acceptButtonText}")`);
  // isVisible() does not wait. The consent banner is rendered by script after
  // domcontentloaded, so an immediate check can miss it, skip the accept, and
  // leave .md-consent__overlay to intercept the next click 30s later. Wait a
  // bounded amount for it instead, and tolerate it genuinely not being there.
  try {
    await accept.waitFor({ state: 'visible', timeout: 5000 });
  } catch {
    return;
  }
  await accept.click();
  await page.locator(selectors.consentDialog).waitFor({ state: 'hidden' });
}

async function openSearchIfVisible(page) {
  const searchLabel = page.locator(selectors.searchLabel);
  if (await searchLabel.isVisible()) {
    await searchLabel.click();
  }
}

test('Verify index file exists', async ({ page }) => {
  await page.goto('/kubestackplus/index.html');
  await expect(page).toHaveURL(/\/kubestackplus\/index\.html$/);
});

test('Verify custom 404 file exists', async ({ page }) => {
  await page.goto('/kubestackplus/404.html');
  await expect(page).toHaveURL(/\/kubestackplus\/404\.html$/);
});

test('Search for incorrectly rendered fenced code blocks', async ({ page }) => {
  await page.goto('/kubestackplus/');
  await page.waitForLoadState('domcontentloaded');
  await acceptConsentIfPresent(page);
  await openSearchIfVisible(page);

  const searchInput = page.locator(selectors.searchInput);
  await expect(searchInput).toBeVisible();
  await searchInput.click();
  await searchInput.fill('```');

  const searchResultItem = page.locator(selectors.searchResultItem);
  await expect(searchResultItem).toHaveCount(0);
});

test('Search for incorrectly rendered admonitions', async ({ page }) => {
  await page.goto('/kubestackplus/');
  await page.waitForLoadState('domcontentloaded');
  await acceptConsentIfPresent(page);
  await openSearchIfVisible(page);

  const searchInput = page.locator(selectors.searchInput);
  await expect(searchInput).toBeVisible();
  await searchInput.click();
  await searchInput.fill('!!!');

  const searchResultItem = page.locator(selectors.searchResultItem);
  await expect(searchResultItem).toHaveCount(0);
});


