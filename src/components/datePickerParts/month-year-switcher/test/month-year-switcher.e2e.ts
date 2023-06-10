import { newE2EPage } from '@stencil/core/testing';

describe('month-year-switcher', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<month-year-switcher></month-year-switcher>');

    const element = await page.find('month-year-switcher');
    expect(element).toHaveClass('hydrated');
  });
});
