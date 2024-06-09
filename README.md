# Welcome

## Disclaimers:

- This project is owned by team, only using for training purposes. Please do NOT leak, upload to anywhere (except team's permission and monitoring).
- This project is based on around 20% tasks as team's workspace.

### Installation:

```
1. git clone ...
2. rm -rf .git
3. npm i --legacy-peer-deps (sorry, this project is training project so you know... ¯\_(ツ)_/¯)
4. npm run dev
```

### Folder structure:
```
project
│   README.md (IMPORTANT !!!)
│   
│───app (basically only containing stuffs)
│   
└───components (basically containing small and reusable components)
│   
└───constants (basically containing shared and global constants only)
│   
└───containers (containing big components having more than 6 components inside, page > container > components)
│
└───ducks (containing ducks, each single duck is combined from `reducers`, `selectors`, `actions` as `creators`,...)
│   │   file011.txt
│   │   file012.txt
│   │
│   └───subfolder1
│       │   file111.txt
│       │   file112.txt
│       │   ...
│   
└───folder2
    │   file021.txt
    │   file022.txt
```

### Libraries:

### Backlog: 

1. Make UI/UX: Search Cars Page (SCP), Car Detail Page (CDP), Compare Modal with `Compare` toggle button, Filter chips in SCP.
2. Add `Spotlight` car at the top of SCP.
3. Navigate to CDP when click one item in SCP.
4. Create ducks to manage state SSR
5. Add fixed and floating `Compare Modal`, `Advertising`
6. Handle API for mocks in `pages/api/...`
7. Handle `< Results`, `< Previous`, `Next >` in CDP
8. Auto scrolling after navigating to CDP to `Finance` component in CDP after clicking item price in SCP
9. Responsive 

