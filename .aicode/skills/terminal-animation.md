# Skill: Terminal Animation
## Purpose: Animated terminal for methodology section

### Behavior
1. macOS-style window chrome: 3 colored dots (red #FF5F57, yellow #FFBD2E, green #28CA41)
2. Lines appear one by one at 600ms intervals
3. Color coding:
   - Lines starting with `$` → accent (#00D282)
   - Lines containing `✓` → green (#28CA41)
   - All other lines → rgba(255,255,255,0.5)
4. Blinking cursor at end (8px wide, 16px tall, accent color, 1s blink)
5. After all lines displayed: 3s pause → clear → restart loop

### Lines (hardcoded)
```
$ claude-code --orchestrate
> Loading AICODE methodology...
> KERNEL score: 94/100 ✓
> Delegating to Builder (Sonnet)...
> Architecture validated by Architect (Opus)
> Tests passing: 26/26 ✓
> Deploy to Vercel... ✓
> Product live. Zero lines written manually.
```

### React Integration
- Use useState for lines array
- useEffect with setInterval for typing
- Cleanup interval on unmount
- Use useRef for restart timeout

### Considerations
- Monospace font: JetBrains Mono 13px
- Background: rgba(255,255,255,0.02)
- Border: 1px solid rgba(255,255,255,0.06)
- Padding: 24px
- lineHeight: 2
- minHeight: 280px (prevent layout shift during typing)
- On mobile: font-size 11px, allow horizontal scroll if needed
