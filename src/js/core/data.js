const locales = [
  {
    abbreviation: 'AU',
    countryCode: 'AUS',
    language: 'au',
    name: 'Australia',
    active: true,
    emoji: '🇦🇺'
  },
  {
    abbreviation: 'US',
    countryCode: 'USA',
    language: 'en',
    name: 'United States',
    active: true,
    emoji: '🇺🇸'
  },
  {
    abbreviation: 'CA',
    countryCode: 'CAN',
    language: 'ca',
    name: 'Canada',
    active: true,
    emoji: '🇨🇦'
  },
  {
    abbreviation: 'CA',
    countryCode: 'CAN',
    language: 'fr_ca',
    name: 'Canada - French',
    drinkingAge: 19,
    emoji: '🇨🇦'
  },
  {
    abbreviation: 'ZH',
    countryCode: 'CHN',
    language: 'zh',
    name: 'China',
    active: true,
    emoji: '🇨🇳'
  },
  {
    abbreviation: 'DE',
    countryCode: 'DEU',
    language: 'de',
    name: 'Germany',
    active: true,
    emoji: '🇩🇪'
  },
  {
    abbreviation: 'FR',
    countryCode: 'FRA',
    language: 'fr',
    name: 'France',
    active: true,
    emoji: '🇫🇷'
  },
  {
    abbreviation: 'JP',
    countryCode: 'JPN',
    language: 'ja',
    name: 'Japan',
    active: true,
    emoji: '🇯🇵'
  },
  {
    abbreviation: 'RU',
    countryCode: 'RUS',
    language: 'ru',
    name: 'Russia',
    active: true,
    emoji: '🇷🇺'
  },
  {
    abbreviation: 'UK',
    countryCode: 'GBR',
    language: 'uk',
    name: 'United Kingdom',
    active: true,
    emoji: '🇬🇧'
  }
];

const countries = [
  {
    abbreviation: 'US',
    name: 'United States',
    drinkingAge: 21,
    active: true,
    emoji: '🇺🇸'
  },
  {
    abbreviation: 'AU',
    name: 'Australia',
    drinkingAge: 18,
    active: true,
    emoji: '🇦🇺'
  },
  {
    abbreviation: 'CA',
    name: 'Canada',
    drinkingAge: 19,
    active: true,
    emoji: '🇨🇦'
  },
  {
    abbreviation: 'ZH',
    name: 'China',
    drinkingAge: 18,
    active: true,
    emoji: '🇨🇳'
  },
  {
    abbreviation: 'FR',
    name: 'France',
    drinkingAge: 18,
    active: true,
    emoji: '🇫🇷'
  },
  {
    abbreviation: 'DE',
    name: 'Germany',
    drinkingAge: 18,
    active: true,
    emoji: '🇩🇪'
  },
  {
    abbreviation: 'JP',
    name: 'Japan',
    drinkingAge: 20,
    active: true,
    emoji: '🇯🇵'
  },
  {
    abbreviation: 'UK',
    name: 'United Kingdom',
    drinkingAge: 18,
    active: true,
    emoji: '🇬🇧'
  },
  {
    abbreviation: 'RU',
    name: 'Russia',
    drinkingAge: 18,
    active: true,
    emoji: '🇷🇺'
  },
  {
    abbreviation: 'OT',
    name: 'Other',
    drinkingAge: 21,
    active: true
  },
  {
    abbreviation: 'AR',
    name: 'Argentina',
    drinkingAge: 18,
    active: false,
    emoji: '🇦🇷'
  },
  {
    abbreviation: 'AT',
    name: 'Austria',
    drinkingAge: 18,
    active: false,
    emoji: '🇦🇹'
  },
  {
    abbreviation: 'BE',
    name: 'Belgium',
    drinkingAge: 18,
    active: false,
    emoji: '🇧🇪'
  },
  {
    abbreviation: 'BR',
    name: 'Brazil',
    drinkingAge: 18,
    active: false,
    emoji: '🇧🇷'
  },
  {
    abbreviation: 'BG',
    name: 'Bulgaria',
    drinkingAge: 18,
    active: false,
    emoji: '🇧🇬'
  },
  {
    abbreviation: 'KH',
    name: 'Cambodia',
    drinkingAge: 18,
    active: false,
    emoji: '🇨🇰'
  },
  {
    abbreviation: 'CL',
    name: 'Chile',
    drinkingAge: 18,
    active: false,
    emoji: '🇨🇱'
  },
  {
    abbreviation: 'CO',
    name: 'Colombia',
    drinkingAge: 18,
    active: false,
    emoji: '🇨🇴'
  },
  {
    abbreviation: 'HR',
    name: 'Croatia',
    drinkingAge: 18,
    active: false,
    emoji: '🇭🇷'
  },
  {
    abbreviation: 'CZ',
    name: 'Czech Republic',
    drinkingAge: 18,
    active: false,
    emoji: '🇨🇿'
  },
  {
    abbreviation: 'DK',
    name: 'Denmark',
    drinkingAge: 16,
    active: false,
    emoji: '🇩🇰'
  },
  {
    abbreviation: 'EC',
    name: 'Ecuador',
    drinkingAge: 18,
    active: false,
    emoji: '🇪🇨'
  },
  {
    abbreviation: 'EE',
    name: 'Estonia',
    drinkingAge: 18,
    active: false,
    emoji: '🇪🇪'
  },
  {
    abbreviation: 'FI',
    name: 'Finland',
    drinkingAge: 18,
    active: false,
    emoji: '🇫🇮'
  },
  {
    abbreviation: 'GR',
    name: 'Greece',
    drinkingAge: 18,
    active: false,
    emoji: '🇬🇷'
  },
  {
    abbreviation: 'HK',
    name: 'Hong Kong',
    drinkingAge: 18,
    active: false,
    emoji: '🇭🇰'
  },
  {
    abbreviation: 'HU',
    name: 'Hungary',
    drinkingAge: 18,
    active: false,
    emoji: '🇭🇺'
  },
  {
    abbreviation: 'IN',
    name: 'India',
    drinkingAge: 18,
    active: false,
    emoji: '🇮🇳'
  },
  {
    abbreviation: 'ID',
    name: 'Indonesia',
    drinkingAge: 21,
    active: false,
    emoji: '🇮🇩'
  },
  {
    abbreviation: 'IE',
    name: 'Ireland',
    drinkingAge: 18,
    active: false,
    emoji: '🇮🇪'
  },
  {
    abbreviation: 'IT',
    name: 'Italy',
    drinkingAge: 16,
    active: false,
    emoji: '🇮🇹'
  },
  {
    abbreviation: 'KR',
    name: 'Korea, Republic of',
    drinkingAge: 19,
    active: false,
    emoji: '🇰🇷'
  },
  {
    abbreviation: 'LV',
    name: 'Latvia',
    drinkingAge: 18,
    active: false,
    emoji: '🇱🇻'
  },
  {
    abbreviation: 'LT',
    name: 'Lithuania',
    drinkingAge: 18,
    active: false,
    emoji: '🇱🇹'
  },
  {
    abbreviation: 'MY',
    name: 'Malaysia',
    drinkingAge: 18,
    active: false,
    emoji: '🇲🇾'
  },
  {
    abbreviation: 'MX',
    name: 'Mexico',
    drinkingAge: 18,
    active: false,
    emoji: '🇲🇽'
  },
  {
    abbreviation: 'NL',
    name: 'Netherlands',
    drinkingAge: 18,
    active: false,
    emoji: '🇳🇱'
  },
  {
    abbreviation: 'NZ',
    name: 'New Zealand',
    drinkingAge: 18,
    active: false,
    emoji: '🇳🇿'
  },
  {
    abbreviation: 'NO',
    name: 'Norway',
    drinkingAge: 20,
    active: false,
    emoji: '🇳🇴'
  },
  {
    abbreviation: 'PE',
    name: 'Peru',
    drinkingAge: 18,
    active: false,
    emoji: '🇵🇪'
  },
  {
    abbreviation: 'PH',
    name: 'Philippines',
    drinkingAge: 18,
    active: false,
    emoji: '🇵🇭'
  },
  {
    abbreviation: 'PL',
    name: 'Poland',
    drinkingAge: 18,
    active: false,
    emoji: '🇵🇱'
  },
  {
    abbreviation: 'PT',
    name: 'Portugal',
    drinkingAge: 16,
    active: false,
    emoji: '🇵🇹'
  },
  {
    abbreviation: 'RO',
    name: 'Romania',
    drinkingAge: 18,
    active: false,
    emoji: '🇷🇴'
  },
  {
    abbreviation: 'SG',
    name: 'Singapore',
    drinkingAge: 18,
    active: false,
    emoji: '🇸🇬'
  },
  {
    abbreviation: 'SK',
    name: 'Slovakia',
    drinkingAge: 18,
    active: false,
    emoji: '🇸🇰'
  },
  {
    abbreviation: 'SI',
    name: 'Slovenia',
    drinkingAge: 18,
    active: false,
    emoji: '🇸🇮'
  },
  {
    abbreviation: 'ES',
    name: 'Spain',
    drinkingAge: 18,
    active: false,
    emoji: '🇪🇸'
  },
  {
    abbreviation: 'SE',
    name: 'Sweden',
    drinkingAge: 20,
    active: false,
    emoji: '🇸🇪'
  },
  {
    abbreviation: 'CH',
    name: 'Switzerland',
    drinkingAge: 18,
    active: false,
    emoji: '🇨🇭'
  },
  {
    abbreviation: 'TW',
    name: 'Taiwan',
    drinkingAge: 18,
    active: false,
    emoji: '🇹🇼'
  },
  {
    abbreviation: 'TH',
    name: 'Thailand',
    drinkingAge: 18,
    active: false,
    emoji: '🇹🇭'
  },
  {
    abbreviation: 'TR',
    name: 'Turkey',
    drinkingAge: 18,
    active: false,
    emoji: '🇹🇷'
  },
  {
    abbreviation: 'UY',
    name: 'Uruguay',
    drinkingAge: 18,
    active: false,
    emoji: '🇺🇾'
  },
  {
    abbreviation: 'VE',
    name: 'Venezuela',
    drinkingAge: 18,
    active: false,
    emoji: '🇻🇪'
  },
  {
    abbreviation: 'VN',
    name: 'Vietnam',
    drinkingAge: 18,
    active: false,
    emoji: '🇻🇳'
  }
];

const defaultCountry = {
  abbreviation: 'en',
  name: 'United States'
};

const states = [
  {
    abbreviation: 'AL',
    name: 'Alabama'
  },
  {
    abbreviation: 'AK',
    name: 'Alaska'
  },
  {
    abbreviation: 'AZ',
    name: 'Arizona'
  },
  {
    abbreviation: 'AR',
    name: 'Arkansas'
  },
  {
    abbreviation: 'CA',
    name: 'California'
  },
  {
    abbreviation: 'CO',
    name: 'Colorado'
  },
  {
    abbreviation: 'CT',
    name: 'Connecticut'
  },
  {
    abbreviation: 'DE',
    name: 'Delaware'
  },
  {
    abbreviation: 'DC',
    name: 'District Of Columbia'
  },
  {
    abbreviation: 'FL',
    name: 'Florida'
  },
  {
    abbreviation: 'GA',
    name: 'Georgia'
  },
  {
    abbreviation: 'HI',
    name: 'Hawaii'
  },
  {
    abbreviation: 'ID',
    name: 'Idaho'
  },
  {
    abbreviation: 'IL',
    name: 'Illinois'
  },
  {
    abbreviation: 'IN',
    name: 'Indiana'
  },
  {
    abbreviation: 'IA',
    name: 'Iowa'
  },
  {
    abbreviation: 'KS',
    name: 'Kansas'
  },
  {
    abbreviation: 'KY',
    name: 'Kentucky'
  },
  {
    abbreviation: 'LA',
    name: 'Louisiana'
  },
  {
    abbreviation: 'ME',
    name: 'Maine'
  },
  {
    abbreviation: 'MD',
    name: 'Maryland'
  },
  {
    abbreviation: 'MA',
    name: 'Massachusetts'
  },
  {
    abbreviation: 'MI',
    name: 'Michigan'
  },
  {
    abbreviation: 'MN',
    name: 'Minnesota'
  },
  {
    abbreviation: 'MS',
    name: 'Mississippi'
  },
  {
    abbreviation: 'MO',
    name: 'Missouri'
  },
  {
    abbreviation: 'MT',
    name: 'Montana'
  },
  {
    abbreviation: 'NE',
    name: 'Nebraska'
  },
  {
    abbreviation: 'NV',
    name: 'Nevada'
  },
  {
    abbreviation: 'NH',
    name: 'New Hampshire'
  },
  {
    abbreviation: 'NJ',
    name: 'New Jersey'
  },
  {
    abbreviation: 'NM',
    name: 'New Mexico'
  },
  {
    abbreviation: 'NY',
    name: 'New York'
  },
  {
    abbreviation: 'NC',
    name: 'North Carolina'
  },
  {
    abbreviation: 'ND',
    name: 'North Dakota'
  },
  {
    abbreviation: 'OH',
    name: 'Ohio'
  },
  {
    abbreviation: 'OK',
    name: 'Oklahoma'
  },
  {
    abbreviation: 'OR',
    name: 'Oregon'
  },
  {
    abbreviation: 'PA',
    name: 'Pennsylvania'
  },
  {
    abbreviation: 'RI',
    name: 'Rhode Island'
  },
  {
    abbreviation: 'SC',
    name: 'South Carolina'
  },
  {
    abbreviation: 'SD',
    name: 'South Dakota'
  },
  {
    abbreviation: 'TN',
    name: 'Tennessee'
  },
  {
    abbreviation: 'TX',
    name: 'Texas'
  },
  {
    abbreviation: 'UT',
    name: 'Utah'
  },
  {
    abbreviation: 'VT',
    name: 'Vermont'
  },
  {
    abbreviation: 'VA',
    name: 'Virginia'
  },
  {
    abbreviation: 'WA',
    name: 'Washington'
  },
  {
    abbreviation: 'WV',
    name: 'West Virginia'
  },
  {
    abbreviation: 'WI',
    name: 'Wisconsin'
  },
  {
    abbreviation: 'WY',
    name: 'Wyoming'
  }
];

const provinces = [
  {
    abbreviation: 'AB',
    name: 'Alberta'
  },
  {
    abbreviation: 'BC',
    name: 'British Columbia'
  },
  {
    abbreviation: 'MB',
    name: 'Manitoba'
  },
  {
    abbreviation: 'NB',
    name: 'New Brunswick'
  },
  {
    abbreviation: 'NL',
    name: 'Newfoundland and Labrador'
  },
  {
    abbreviation: 'NS',
    name: 'Nova Scotia'
  },
  {
    abbreviation: 'ON',
    name: 'Ontario'
  },
  {
    abbreviation: 'PE',
    name: 'Prince Edward Island'
  },
  {
    abbreviation: 'QC',
    name: 'Quebec'
  },
  {
    abbreviation: 'SK',
    name: 'Saskatchewan'
  },
  {
    abbreviation: 'NT',
    name: 'Northwest Territories'
  },
  {
    abbreviation: 'NU',
    name: 'Nunavut'
  },
  {
    abbreviation: 'YT',
    name: 'Yukon'
  }
];

export {
  defaultCountry,
  locales,
  countries,
  states,
  provinces
};
