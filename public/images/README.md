# Images Directory

This directory contains all static images for the team dashboard project.

## Structure

```
images/
├── team/           # Team member profile photos
│   ├── alex-hart.jpg
│   ├── marcus-johnson.jpg
│   ├── elena-rodriguez.jpg
│   ├── hiroshi-tanaka.jpg
│   ├── priya-patel.jpg
│   ├── james-wilson.jpg
│   ├── ana-silva.jpg
│   ├── david-kim.jpg
│   ├── sophie-martin.jpg
│   └── alex-thompson.jpg
└── other-images/   # Other project images
```

## Naming Convention

- **Team photos**: Use lowercase with hyphens (e.g., `alex-hart.jpg`)
- **File formats**: Use `.jpg`, `.png`, or `.webp` for optimal performance
- **Image size**: Recommended 200x200px or larger for team photos

## Adding New Team Members

1. Add the image file to `images/team/` with the naming convention: `firstname-lastname.jpg`
2. Update the `TEAM_MEMBERS` array in your dashboard component
3. Use the path: `/images/team/firstname-lastname.jpg`

## Fallback

If an image fails to load, the component will automatically show the user's initials as a fallback. 