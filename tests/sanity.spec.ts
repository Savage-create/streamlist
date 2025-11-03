import { test, expect } from "@playwright/test";

test("StreamList sanity: login → add → cart → checkout → save card", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/`);
  await expect(page).toHaveURL(/\/login$/);

  await page.getByRole("button", { name: /continue as guest/i }).click();
  await expect(page).toHaveURL(`${baseURL}/`);

  await page.getByRole("link", { name: /subscriptions/i }).click();
  const addButtons = page.getByRole("button", { name: /^add$/i });
  expect(await addButtons.count()).toBeGreaterThan(0);
  await addButtons.first().click();

  await page.getByRole("link", { name: /cart/i }).click();
  const checkout = page.getByRole("button", { name: /proceed to checkout/i });
  await expect(checkout).toBeEnabled();
  await checkout.click();

  await expect(page).toHaveURL(/\/checkout$/);
  await page.getByLabel(/name on card/i).fill("Timothy Savage");
  await page.getByLabel(/card number/i).fill("4242424242424242");
  const cardVal = await page.getByLabel(/card number/i).inputValue();
  expect(cardVal).toMatch(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/);
  await page.getByLabel(/exp/i).fill("12/29");
  await page.getByLabel(/cvv/i).fill("123");

  page.once("dialog", d => d.accept());
  await page.getByRole("button", { name: /pay now/i }).click();

  const ls = await page.evaluate(() => localStorage.getItem("streamlist:card"));
  expect(ls).not.toBeNull();
  const parsed = JSON.parse(ls!);
  expect(parsed.name).toContain("Timothy");
  expect(parsed.card).toMatch(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/);

  const hasManifest = await page.evaluate(() => !!document.querySelector('link[rel="manifest"]'));
  expect(hasManifest).toBeTruthy();
});

test("Private routes block when logged out", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/login`);
  await page.getByRole("button", { name: /continue as guest/i }).click();
  await expect(page).toHaveURL(`${baseURL}/`);

  const logoutBtn = page.getByRole("button", { name: /logout/i });
  await logoutBtn.click();

  await page.goto(`${baseURL}/cart`);
  await expect(page).toHaveURL(/\/login$/);
});
