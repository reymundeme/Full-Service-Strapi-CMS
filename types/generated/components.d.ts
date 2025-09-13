import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsColumnItemContent extends Struct.ComponentSchema {
  collectionName: 'components_sections_column_item_contents';
  info: {
    displayName: 'column_item_content';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    short_description: Schema.Attribute.String;
    title: Schema.Attribute.String;
    URL: Schema.Attribute.String;
  };
}

export interface SectionsColumnItemSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_column_item_sections';
  info: {
    displayName: 'column_item_section';
  };
  attributes: {
    background: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    column_item_content: Schema.Attribute.Component<
      'sections.column-item-content',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'hero';
  };
  attributes: {
    BackgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    ButtonText: Schema.Attribute.String;
    ButtonURL: Schema.Attribute.String;
    Subtitle: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface SectionsItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_items';
  info: {
    displayName: 'item';
  };
  attributes: {
    ButtonText: Schema.Attribute.String;
    ButtonURL: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsItemContent extends Struct.ComponentSchema {
  collectionName: 'components_sections_item_contents';
  info: {
    displayName: 'item-content';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    buttonURL: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsItemSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_item_sections';
  info: {
    displayName: 'item-section';
  };
  attributes: {
    background: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    item: Schema.Attribute.Component<'sections.item-content', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsSectionWithItems extends Struct.ComponentSchema {
  collectionName: 'components_sections_section_with_items';
  info: {
    displayName: 'sectionWithItems';
  };
  attributes: {
    heading: Schema.Attribute.String;
    subheading: Schema.Attribute.String;
  };
}

export interface SectionsSection1 extends Struct.ComponentSchema {
  collectionName: 'components_sections_section1s';
  info: {
    displayName: 'section1';
  };
  attributes: {
    background: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    button_text: Schema.Attribute.String;
    button_text_2: Schema.Attribute.String;
    button_url: Schema.Attribute.String;
    button_url_2: Schema.Attribute.String;
    content: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsSection2 extends Struct.ComponentSchema {
  collectionName: 'components_sections_section2s';
  info: {
    displayName: 'section2';
  };
  attributes: {
    background: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    button_text: Schema.Attribute.String;
    button_text_2: Schema.Attribute.String;
    button_url: Schema.Attribute.String;
    button_url_2: Schema.Attribute.String;
    content: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsSections extends Struct.ComponentSchema {
  collectionName: 'components_sections_sections';
  info: {
    displayName: 'sections';
  };
  attributes: {};
}

export interface SectionsTextLeftSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_text_left_sections';
  info: {
    displayName: 'text-left-section';
  };
  attributes: {
    background: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    content: Schema.Attribute.RichText;
    title: Schema.Attribute.String;
  };
}

export interface SectionsTextSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_text_sections';
  info: {
    displayName: 'text-section';
  };
  attributes: {
    background: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    content: Schema.Attribute.RichText;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.column-item-content': SectionsColumnItemContent;
      'sections.column-item-section': SectionsColumnItemSection;
      'sections.hero': SectionsHero;
      'sections.item': SectionsItem;
      'sections.item-content': SectionsItemContent;
      'sections.item-section': SectionsItemSection;
      'sections.section-with-items': SectionsSectionWithItems;
      'sections.section1': SectionsSection1;
      'sections.section2': SectionsSection2;
      'sections.sections': SectionsSections;
      'sections.text-left-section': SectionsTextLeftSection;
      'sections.text-section': SectionsTextSection;
    }
  }
}
