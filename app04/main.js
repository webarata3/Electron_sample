const {app, BrowserWindow, Menu} = require('electron');

let win;

function createWindow() {
  win = new BrowserWindow({width: 800, height: 600});
  win.loadFile('index.html');
  initMenu();
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

function initMenu() {
  const template = [
    {
      label: 'メニュー1',
      submenu: [
        {
          label: '閉じる',
          role: 'close'
        },
        {
          label: 'サンプル1',
          click() {
          }
        },
        {type: 'separator'},
        {
          role: 'services', submenu: [
            {
              label: 'サンプル2',
              click() {
              }
            },
            {
              label: 'サンプル3',
              click() {
              }
            }
          ]
        },
      ]
    },
    {
      label: 'チェックボックス',
      submenu: [
        {
          label: 'ログ出力',
          click() {
            const menu = Menu.getApplicationMenu();
            const check1Menu = menu.getMenuItemById('check1');
            const check2Menu = menu.getMenuItemById('check2');
            console.log(`チェック1=${check1Menu.checked}`);
            console.log(`チェック2=${check2Menu.checked}`);
          }
        },
        {
          id: 'check1',
          label: 'チェック1',
          type: 'checkbox'
        },
        {
          id: 'check2',
          label: 'チェック2',
          type: 'checkbox'
        }
      ]
    },
    {
      label: 'ラジオボタン',
      submenu: [
        {
          label: 'ラジオ1',
          type: 'radio',
          click: onClick
        },
        {
          label: 'ラジオ2',
          type: 'radio',
          click: onClick
        },
        {
          label: 'ラジオ3',
          type: 'radio',
          click: onClick
        },
        {type: 'separator'},
        {
          label: 'ラジオ1',
          type: 'radio',
          click: onClick
        },
        {
          label: 'ラジオ2',
          type: 'radio',
          click: onClick
        },
        {
          label: 'ラジオ3',
          type: 'radio',
          click: onClick
        }
      ]
    }
  ];

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        {role: 'about'}
      ]
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function onClick(menuItem, browserWindow, event) {
  console.log(menuItem);
}
