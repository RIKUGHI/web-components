import { newE2EPage } from '@stencil/core/testing';

describe('single-date-picker', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<single-date-picker></single-date-picker>');

    const element = await page.find('single-date-picker');
    expect(element).toHaveClass('hydrated');
  });
});
