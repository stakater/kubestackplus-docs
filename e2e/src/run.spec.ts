import { test, expect } from '@playwright/test';

const selectors = {
  consentControlsDiv: '.md-consent__controls',
  acceptButtonText: 'Accept',
  searchInput: 'input.md-search__input[placeholder="Search"]',
  searchResultItem: 'li.md-search-result__item',
  searchLabel: 'label.md-header__button.md-icon[for="__search"]',
};

async function acceptConsentIfPresent(page) {
  const accept = page.locator(`${selectors.consentControlsDiv} button:has-text("${selectors.acceptButtonText}")`);
  if (await accept.isVisible()) {
    await accept.click();
  }
}

async function openSearchIfVisible(page) {
  const searchLabel = page.locator(selectors.searchLabel);
  if (await searchLabel.isVisible()) {
    await searchLabel.click();
  }
}

test('Verify index file exists', async ({ page }) => {
  await page.goto('/saap/index.html');
  await expect(page).toHaveURL(/\/saap\/index\.html$/);
});

test('Verify custom 404 file exists', async ({ page }) => {
  await page.goto('/saap/404.html');
  await expect(page).toHaveURL(/\/saap\/404\.html$/);
});

test('Search for incorrectly rendered fenced code blocks', async ({ page }) => {
  await page.goto('/saap/');
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
  await page.goto('/saap/');
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


