# SearchMe OS

## Gameplay

### Game Overview
SearchMe OS is a snooping puzzle game where you explore a simulated desktop environment, searching for clues, passwords, and files to solve the main mystery. Each app on the desktop is interactive and can be customized or themed.

### Objective
You are the greatest private investigator at Othello University and have been hired to investigate a recent incident at a Phi Omega Psi house party—which you weren't invited to. But it turns out that was a good thing!

A chemistry major was hired by the party's organizers to create a serum to make everyone's eyes glow in the dark. It worked great; it was like a dark room full of raccoons. Unfortunately, anyone who drank the serum will lose their eyesight in 2 days.

The chemist-in-training has developed a cure, but needs to know who to give it to. Thankfully, these house parties are strictly invite-only, so all you need is the list of attendees. The chemist has paid good money to keep this quiet, so you've ~acquired~ one of the event organizer's laptops. Find the list and pay your rent!

#### Apps
- **Calendar**: Check events and find hidden hints.
- **FlyMail (Email)**: Read and send emails. Some emails contain clues or passwords.
- **Photos**: Browse through images—some may contain secrets.
- **My World (Contacts)**: View and interact with contacts.
- **Chatto (Messages)**: Chat with various characters. Some conversations unlock new clues.
- **Symph (Music)**: Listen to music tracks.
- **Docs**: Access documents, essays, and files. Some are password-protected.
- **Notes**: Jot down clues and reminders.
- **E-Web (Internet)**: Simulated web browser for in-game research.

Many apps are locked behind puzzles or passwords, and some have multiple layers of access.

### How to Play
1. Explore the desktop and open different apps.
2. Read messages, emails, and documents for clues.
3. Solve puzzles to unlock new apps and files.
4. Piece together the attendee list and deliver it to the chemist.

Good luck, detective!

---

## Development

### Customization & Modding
You can easily modify the contents and behavior of the in-game computer by editing the JSON files in the `src/Resources` folder. These files control the data, appearance, and logic for the apps and the system itself.

https://animate.style/#migration is used for the window animations.

#### Key JSON Files:
- **computerData.json**: Sets the main story, intro text, client info, theme colors, and images for the OS.
- **appData.json**: Controls the available apps, their names, and icons.
- **calendarData.json, contactData.json, docsData.json, emailData.json, messengerData.json, musicData.json, noteData.json, photoData.json**: Each file contains the data for its respective app (events, contacts, documents, emails, messages, music, notes, photos, etc.).
- **documentMap.js**: Maps document IDs to file paths for the Docs app.

#### How to Customize:
- Change app names, icons, and unlock status in `appData.json`.
- Edit or add new emails, messages, contacts, and more by modifying the corresponding JSON file.
- Adjust the story, theme, and system images in `computerData.json`.
- Add or remove files in the `docs` subfolder to change available documents.

#### Example: Adding a New Note
To add a new note to the Notes app, open `src/Resources/noteData.json` and add a new object to the notes array. For example:

```
[
  {
    "title": "Chemistry Clue",
    "content": "Remember to check the guest list for anyone who left early!",
    "date": "2026-05-23"
  }
]
```

After editing these files, simply restart the development server (if running) to see your changes reflected in the game. This makes SearchMe OS highly customizable for new stories, puzzles, or themes.
