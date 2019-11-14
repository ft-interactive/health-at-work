export default () => ({ // eslint-disable-line

  // link file UUID
  id: '806e39f6-06d0-11ea-a984-fbbacad9e7dd',

  // canonical URL of the published page
  //  get filled in by the ./configure script
  url: 'https://ig.ft.com/special-reports/health-work/2019',

  // To set an exact publish date do this:
  //       new Date('2016-05-17T17:11:22Z')
  publishedDate: new Date('2020-01-17T10:00:00Z'),

  headline: 'Do you get healthier as you get older?',

  // summary === standfirst (Summary is what the content API calls it)
  summary: 'Our interactive feature suggests younger workers suffer from a range of mental health issues',

  topic: {
    name: 'Health at Work',
    url: 'https://www.ft.com/health-work',
  },

  relatedArticle: {
    // text: 'Related article »',
    // url: 'https://en.wikipedia.org/wiki/Politics_and_the_English_Language',
  },

  mainImage: {
    title: '',
    description: '',
    credit: '© Dreamstime',

    // You can provide a UUID to an image and it was populate everything else
    uuid: '22c84502-1a78-11e9-9e64-d150b3105d21',

    // You can also provide a URL
    // url: 'https://image.webservices.ft.com/v1/images/raw/http%3A%2F%2Fcom.ft.imagepublish.prod.s3.amazonaws.com%2Fc4bf0be4-7c15-11e4-a7b8-00144feabdc0?source=ig&fit=scale-down&width=700',
  },

  // Byline can by a plain string, markdown, or array of authors
  // if array of authors, url is optional
  byline: [
    { name: 'Chelsea Bruce-Lockhart', url: 'https://www.ft.com/chelsea-bruce-lockhart' },
    { name: 'David Blood', url: 'https://www.ft.com/david-blood' },
  ],

  // Appears in the HTML <title>
  title: 'Do you get healthier as you get older?',

  // meta data
  description: 'Our interactive feature suggests younger workers suffer from a range of mental health issues',

  /*
  TODO: Select Twitter card type -
        summary or summary_large_image

        Twitter card docs:
        https://dev.twitter.com/cards/markup
  */
  twitterCard: 'summary',

  /*
  TODO: Do you want to tweak any of the
        optional social meta data?
  */
  // General social
  socialImage: 'https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3A22c84502-1a78-11e9-9e64-d150b3105d21?source=ig&width=1400',
  socialHeadline: 'The millennial bug: are you suffering too?',
  socialDescription: 'Enter your age into our interactive and find out how you compare on drinking, smoking, mental health and other problems that employees encounter',
  // twitterCreator: '@author's_account', // shows up in summary_large_image cards

  // TWEET BUTTON CUSTOM TEXT
  // tweetText: '',
  //
  // Twitter lists these as suggested accounts to follow after a user tweets (do not include @)
  // twitterRelatedAccounts: ['authors_account_here', 'ftdata'],

  // Fill out the Facebook/Twitter metadata sections below if you want to
  // override the General social options above

  // TWITTER METADATA (for Twitter cards)
  // twitterImage: '',
  // twitterHeadline: '',
  // twitterDescription: '',

  // FACEBOOK
  // facebookImage: '',
  // facebookHeadline: '',
  // facebookDescription: '',

  // ADVERTISING
  ads: {
    // Ad unit hierarchy makes ads more granular.
    gptSite: 'ft.com/special.reports',
    // Start with ft.com and /companies /markets /world as appropriate to your story
    gptZone: 'health.at.work',
    // granular targeting is optional and will be specified by the ads team
    dfpTargeting: false,
  },

  tracking: {

    /*

    Microsite Name

    e.g. guffipedia, business-books, baseline.
    Used to query groups of pages, not intended for use with
    one off interactive pages. If you're building a microsite
    consider more custom tracking to allow better analysis.
    Also used for pages that do not have a UUID for whatever reason
    */
    // micrositeName: '',

    /*
    Product name

    This will usually default to IG
    however another value may be needed
    */
    // product: '',
  },
});
