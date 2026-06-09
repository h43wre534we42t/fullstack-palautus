const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Testy',
        username: 'tav',
        password: 'wrod'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test ('user can log in with correct credentials', async ({ page }) => {
    await page.goto('http://localhost:5173/login')
    await page.getByLabel('username').first().fill('tav')
    await page.getByLabel('password').last().fill('wrod')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('logged in as Testy')).toBeVisible()
    })
  
  test ('user can not log in with incorrect credentials', async ({ page }) => {
    await page.goto('http://localhost:5173/login')
    await page.getByLabel('username').first().fill('wrong')
    await page.getByLabel('password').last().fill('password')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('login failed')).toBeVisible()
    })
    
  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.goto('http://localhost:5173/login')
      await page.getByLabel('username').first().fill('tav')
      await page.getByLabel('password').last().fill('wrod')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test ('user can create a blog', async ({ page }) => {
      await page.getByRole('link', { name: 'new blog' }).click()
      await page.getByPlaceholder('Author').fill('Balthazar')
      await page.getByPlaceholder('Title').fill('Necromancy 101')
      await page.getByPlaceholder('URL').fill('www.necromancerslair.dead')
      await page.getByRole('button', { name: 'save' }).click()

      await expect(page.getByText('Necromancy 101 by Balthazar')).toBeVisible()
    })
    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('link', { name: 'new blog' }).click()
        await page.getByPlaceholder('Author').fill('Balthazar')
        await page.getByPlaceholder('Title').fill('Necromancy 101')
        await page.getByPlaceholder('URL').fill('www.necromancerslair.dead')
        await page.getByRole('button', { name: 'save' }).click()
      })

      test('user can like a blog', async ({ page }) => {
        await page.getByRole('link', { name: 'Necromancy 101 by Balthazar' }).click()
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText('likes: 1')).toBeVisible()
      })

      test('user can delete their blog', async ({ page }) => {
        await page.getByRole('link', { name: 'Necromancy 101 by Balthazar' }).click()

        page.on('dialog', dialog => dialog.accept());
        await page.getByRole('button', { name: 'remove' }).click()

        await expect(page.getByText('Necromancy 101 by Balthazar')).not.toBeVisible()
      })
    })
  })
})