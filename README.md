# challenge-tracker

A side project for fun and to follow my personal challenges

## What's about?

Challenge Tracker is a static site generator for tracking and showcasing personal challenges, particularly focused on content creation and social media engagement. It was built to automate the process of tracking daily posts, engagement metrics, and overall progress for month-long challenges.

## Getting Started

1. Fork/Clone this repository
2. Install dependencies: `npm install`
3. Add your challenges in the `static/challenges` directory. Each challenge should be in its own subdirectory.
4. Describe your challenge in a `rules.md` file.
5. Add challenge's entries when done as `yyyymmdd.md` files.
6. - Launch your Challenge Tracker with `npm run dev`
   - Deploy it on to your preferred static hosting service (_Vercel in my case_).

### Example challenge structure:

A sample demo challenge is available [here](static/challenges/challenge_demo_sample/)

```
static/challenges/
└── challenge_demo_sample/
    ├── rules.md
    ├── 20241001.md
    ├── 20241002.md
    └── ...
```

### Example of challenge description `rules.md`:

A sample rules.md is available [here](static/challenges/challenge_demo_sample/rules.md)

```markdown
---
title: Challenge Demo Sample
start: 2024-09-26
end: 2024-09-29
---

The description of the challenge.
```

### Example of challenge entry `yyyymmdd.md`:

A few sample entries are available [here](static/challenges/challenge_demo_sample/)

```markdown
---
date: 2024-09-29 # the entry date
impressions: 0 # some stat
reactions: 0 # some stats
comments: 0 # some stats
shares: 0 # some stats
followers: 0 # some stats
tags: project_management content_marketing writing # some tags
---

The description of the entry (in my case: a LinkedIn post).
```

## Next Steps (Backlog Ideas)

- Make stats more flexible to handle various types of challenges (dynamic from metadata).
- Make advanced stats (group by tags, compute by objectives...).
- Separate 'Completed' challenges from others in a second row / or with a toggle button.
- Enhance UI Design and improve the mardown parsing to produce styled html for challenge description.
- ...

**Feel free to open issue for suggestions**

## Contributing

- Fork the repository
- Create a new branch: git switch -c feature-branch-name
- Make your changes
- Commit your changes: git commit -m '<type>: <description>' (refer to [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/))
- Push to the branch: git push origin feature-branch-name
- Submit a pull request

For major changes, please open an issue first to discuss what you would like to change.

## Code of Conduct

Please read the [Code of Conduct](CODE_OF_CONDUCT.md) (Coming Soon).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Spread the Word!

If you find this project useful, please share it with others! I welcome feedback, suggestions, and contributions. Feel free to use Challenge Tracker for your own challenges and let me know how it goes.
