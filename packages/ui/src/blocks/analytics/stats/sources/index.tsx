import React from 'react';

import { Query } from '../../query';
import ReferrerList, { ReferrersProps } from './referrer-list';
import SearchTerms, { SearchTermsProps } from './search-terms';
import SourceList from './source-list';

export default function Sources(
  props: { query: Query } & SearchTermsProps & ReferrersProps,
) {
  if (props.query.filters.source === 'Google') {
    return <SearchTerms {...props} />;
  } else if (props.query.filters.source) {
    return <ReferrerList {...props} />;
  } else {
    return <SourceList {...props} />;
  }
}
