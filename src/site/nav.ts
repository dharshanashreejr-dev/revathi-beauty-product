// Links shown in the "Explore" menu under the main site links, depending on the page.
export const pageLinks = (pathname: string): [string, string][] => {
  if (pathname.startsWith('/services')) return [['The ritual menu', '/services#menu'], ['Natural ingredients', '/services#ingredients'], ['Visit the spa', '/services#visit']]
  if (pathname.startsWith('/about')) return [['Our story', '/about#story'], ['The journey', '/about#journey'], ['Our promises', '/about#values'], ['The people', '/about#team'], ['Visit us', '/about#visit']]
  if (pathname.startsWith('/track') || pathname.startsWith('/account')) return [['My orders', '/track?tab=orders'], ['My appointments', '/track?tab=appointments'], ['My profile', '/track?tab=profile']]
  return []
}
