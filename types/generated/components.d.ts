import type { Schema, Struct } from '@strapi/strapi';

export interface AboutUsAboutUs extends Struct.ComponentSchema {
  collectionName: 'components_about_us_about_uses';
  info: {
    displayName: 'About Us';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 900;
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 20;
      }>;
  };
}

export interface ContactUsAddress extends Struct.ComponentSchema {
  collectionName: 'components_contact_us_addresses';
  info: {
    description: '';
    displayName: 'Address';
  };
  attributes: {
    address: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    country: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 15;
      }>;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    phone: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 19;
      }>;
  };
}

export interface FaqQuestionsFaqQuestions extends Struct.ComponentSchema {
  collectionName: 'components_faq_questions_faq_questions';
  info: {
    displayName: 'FAQ Questions';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface GuestsGuests extends Struct.ComponentSchema {
  collectionName: 'components_guests_guests';
  info: {
    displayName: 'Guests';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    specification: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HighlightsHighlights extends Struct.ComponentSchema {
  collectionName: 'components_highlights_highlights';
  info: {
    displayName: 'Highlights';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    time: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomePageBanner extends Struct.ComponentSchema {
  collectionName: 'components_home_page_banners';
  info: {
    description: '';
    displayName: 'Section Information';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 300;
      }>;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 40;
      }>;
  };
}

export interface HomePageHowItWork extends Struct.ComponentSchema {
  collectionName: 'components_home_page_how_it_works';
  info: {
    description: '';
    displayName: 'How It Work';
  };
  attributes: {
    description: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 120;
      }>;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 25;
      }>;
  };
}

export interface HomePageYouHaveBeenWaitingFor extends Struct.ComponentSchema {
  collectionName: 'components_home_page_you_have_been_waiting_fors';
  info: {
    description: '';
    displayName: 'You Have Been Waiting For';
  };
  attributes: {
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 85;
      }>;
  };
}

export interface OfferFeaturesFeature extends Struct.ComponentSchema {
  collectionName: 'components_offer_features_features';
  info: {
    description: '';
    displayName: 'Feature';
  };
  attributes: {
    feature: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    price_description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
  };
}

export interface OfferFeaturesOfferFeatures extends Struct.ComponentSchema {
  collectionName: 'components_offer_features_offer_features';
  info: {
    description: '';
    displayName: 'Price';
  };
  attributes: {
    currency: Schema.Attribute.String;
    per: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 30;
      }>;
    price: Schema.Attribute.Integer;
  };
}

export interface OfferFeaturesPricing extends Struct.ComponentSchema {
  collectionName: 'components_offer_features_pricings';
  info: {
    description: '';
    displayName: 'Plan Card';
  };
  attributes: {
    best_seller: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    country: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 30;
      }>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    features: Schema.Attribute.Component<'offer-features.feature', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 2;
        },
        number
      >;
    payment_link: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 600;
      }>;
    price: Schema.Attribute.Component<'offer-features.offer-features', false> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
  };
}

export interface PrivacyPolicyPrivacyPolicy extends Struct.ComponentSchema {
  collectionName: 'components_privacy_policy_privacy_policies';
  info: {
    displayName: 'Privacy Policy';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 3000;
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 40;
      }>;
  };
}

export interface SeoSeo extends Struct.ComponentSchema {
  collectionName: 'components_seo_seos';
  info: {
    displayName: 'SEO';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    keywords: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about-us.about-us': AboutUsAboutUs;
      'contact-us.address': ContactUsAddress;
      'faq-questions.faq-questions': FaqQuestionsFaqQuestions;
      'guests.guests': GuestsGuests;
      'highlights.highlights': HighlightsHighlights;
      'home-page.banner': HomePageBanner;
      'home-page.how-it-work': HomePageHowItWork;
      'home-page.you-have-been-waiting-for': HomePageYouHaveBeenWaitingFor;
      'offer-features.feature': OfferFeaturesFeature;
      'offer-features.offer-features': OfferFeaturesOfferFeatures;
      'offer-features.pricing': OfferFeaturesPricing;
      'privacy-policy.privacy-policy': PrivacyPolicyPrivacyPolicy;
      'seo.seo': SeoSeo;
    }
  }
}
