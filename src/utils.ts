// src/utils.ts
  
  import { Retailer } from './types';

export function processRetailerData(data: any[]): string[] {
  const groupedData: { [category: string]: Retailer[] } = {};

  data.forEach((row) => {
    const category = row.directory_category || 'Uncategorized';

    const retailer: Retailer = {
        directory_category: category,
        content_children_count: parseInt(row.content_children_count, 10) || 0,
        directory_contact__email: '',
        directory_contact__fax: '',
        directory_contact__mobile: '',
        directory_contact__phone: '',
        directory_contact__website: '',
        content_post_id: 0,
        content_post_slug: '',
        content_body: '',
        directory_location__street: '',
        directory_location__city: '',
        directory_location__country: '',
        directory_location__address: '',
        directory_location__lat: 0,
        directory_location__lng: 0,
        directory_location__zip: '',
        directory_location__state: '',
        directory_social__facebook: '',
        directory_social__googleplus: '',
        directory_social__twitter: '',
        content_post_status: '',
        content_post_title: ''
    };

    if (!groupedData[category]) {
      groupedData[category] = [];
    }

    groupedData[category].push(retailer);
  });

  const jsonLines: string[] = [];

  Object.keys(groupedData).forEach((category) => {
    groupedData[category].forEach((retailer) => {
      jsonLines.push(JSON.stringify(retailer));
    });
  });

  return jsonLines;
}

export { Retailer };
