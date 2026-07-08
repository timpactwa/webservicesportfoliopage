import TeamMember from '../../components/ui/TeamMember'

// No `image` prop in these stories — renders the built-in initials fallback,
// which is the reliable state to preview (the real site's photos are app
// public assets not available in this bundle; the `image` prop still works
// the same way when the consuming app supplies a real URL).

export function WithGitHubAndLinkedIn() {
  return (
    <TeamMember
      name="Tim Pactwa"
      role="Co-founder"
      school="Virginia Tech"
      focus="Computer Science"
      bio="I build the sites. CS student at Virginia Tech with a focus on modern web technologies. I'm obsessed with performance, clean code, and building things that actually work."
      initials="T"
      accentShape="square"
      github="#"
      linkedin="#"
    />
  )
}

export function LinkedInOnly() {
  return (
    <TeamMember
      name="Luke Wilkins"
      role="Co-founder"
      school="Virginia Tech"
      focus="Finance"
      bio="I handle the strategy. Business and marketing student focused on helping local businesses tell their story online and grow their customer base without burning money."
      initials="L"
      accentShape="circle"
      linkedin="#"
    />
  )
}
