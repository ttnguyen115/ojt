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

1. Feature: Make UI/UX - Search Cars Page (SCP)
   ![image](https://github.com/ttnguyen115/ojt/assets/56264793/ae70d872-96f7-44fd-9f3e-76e0ff8a3e4f)
   Car API: https://github.com/ttnguyen115/ojt/blob/master/postman_collection.json
    - US1001: Split page layout by border with responsive
    - US1002: Create grid of cars with responsive
    - US1003: Making dynamic car item card with data
    - US1004: Making filters for Desktop view part 1
    - US1005: Making filters for Desktop view part 2
    - US1006: Making filters for Mobile view part 1
    - US1006: Making filters for Mobile view part 2
      
3. Car Detail Page (CDP).
4. Compare Modal with `Compare` toggle button.
5. Filter chips in SCP.
6. Add `Spotlight` car at the top of SCP.
7. Navigate to CDP when click one item in SCP.
8. Create ducks to manage state SSR
9. Add fixed and floating `Compare Modal`, `Advertising`
10. Handle API for mocks in `pages/api/...`
11. Handle `< Results`, `< Previous`, `Next >` in CDP
12. Auto scrolling after navigating to CDP to `Finance` component in CDP after clicking item price in SCP
13. Responsive 

