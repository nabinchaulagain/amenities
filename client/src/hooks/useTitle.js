import React from 'react';

const useTitle = (title) => {
  React.useEffect(() => {
    document.title = `${title} - Amenities`;
  }, [title]);
};

export default useTitle;
