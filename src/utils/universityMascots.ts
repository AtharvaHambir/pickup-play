
export const universityMascots: Record<string, string> = {
  'northeastern.edu': '🐕', // Huskies
  'harvard.edu': '🦬', // Crimson (using bull as closest match)
  'mit.edu': '🦫', // Engineers/Beavers
  'bu.edu': '🐕‍🦺', // Terriers
  'bc.edu': '🦅', // Eagles
  'tufts.edu': '🐘', // Jumbos
  'brandeis.edu': '👑', // Judges (using crown)
  'emerson.edu': '🦁', // Lions
  'suffolk.edu': '🐏', // Rams
  'simmons.edu': '🦆', // Sharks (using duck as closest water animal)
  'berklee.edu': '🎵', // No mascot, using music note for music school
  'fisher.edu': '🦅', // Falcons (using eagle)
  'wheelock.edu': '🌟', // Wildcats (using star)
  'newengland.edu': '🐺', // Pilgrims/Wolves
  'mcphs.edu': '⚕️', // Medical symbol for pharmacy school
  'lesley.edu': '🦋', // Lynx (using butterfly for nature theme)
  'cambridge.edu': '🎓', // Academic institution
  'yale.edu': '🐕‍🦺', // Bulldogs
  'brown.edu': '🐻', // Bears
  'dartmouth.edu': '🌲', // Big Green (using tree)
  'princeton.edu': '🐅', // Tigers
  'columbia.edu': '🦁', // Lions
  'upenn.edu': '🐺', // Quakers/Wolves
  'cornell.edu': '🐻', // Big Red Bears
  'stanford.edu': '🌲', // Cardinal/Tree
  'berkeley.edu': '🐻', // Golden Bears
  'ucla.edu': '🐻', // Bruins
  'usc.edu': '⚔️', // Trojans
  'caltech.edu': '🦫', // Beavers
  'uchicago.edu': '🦅', // Maroons/Phoenix
  'northwestern.edu': '🐱', // Wildcats
  'umich.edu': '🐺', // Wolverines
  'osu.edu': '🌰', // Buckeyes
  'psu.edu': '🦁', // Nittany Lions
  'wisc.edu': '🦡', // Badgers
  'umn.edu': '🐿️', // Golden Gophers
  'uiuc.edu': '⚡', // Fighting Illini
  'purdue.edu': '🚂', // Boilermakers
  'indiana.edu': '🔴', // Hoosiers (using red circle)
  'msu.edu': '⚡', // Spartans
  'iowa.edu': '🦅', // Hawkeyes
  'unl.edu': '🌽', // Cornhuskers
  'ku.edu': '🐦', // Jayhawks
  'missouri.edu': '🐅', // Tigers
  'unc.edu': '🐏', // Tar Heels/Rams
  'duke.edu': '😈', // Blue Devils
  'ncsu.edu': '🐺', // Wolfpack
  'wfu.edu': '👹', // Demon Deacons
  'clemson.edu': '🐅', // Tigers
  'usc.edu': '🐓', // Gamecocks
  'uga.edu': '🐕', // Bulldogs
  'ufl.edu': '🐊', // Gators
  'fsu.edu': '🏹', // Seminoles
  'miami.edu': '🌊', // Hurricanes
  'vt.edu': '🦃', // Hokies (Turkey-related)
  'uva.edu': '⚔️', // Cavaliers
  'utexas.edu': '🤘', // Longhorns
  'tamu.edu': '🐕‍🦺', // Aggies
  'rice.edu': '🦉', // Owls
  'baylor.edu': '🐻', // Bears
  'ttu.edu': '🔴', // Red Raiders
  'ou.edu': '🏇', // Sooners
  'osu.edu': '🤠', // Cowboys
  'ku.edu': '🐦', // Jayhawks
  'ksu.edu': '🐱', // Wildcats
  'colorado.edu': '🦬', // Buffaloes
  'utah.edu': '🦅', // Utes
  'arizona.edu': '🐱', // Wildcats
  'asu.edu': '😈', // Sun Devils
  'ucla.edu': '🐻', // Bruins
  'usc.edu': '⚔️', // Trojans
  'oregon.edu': '🦆', // Ducks
  'uw.edu': '🐕', // Huskies
  'wsu.edu': '🐱', // Cougars
  'default': '🎓'
};

export const getMascotForDomain = (domain: string): string => {
  return universityMascots[domain] || universityMascots['default'];
};
