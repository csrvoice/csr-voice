const EXCLUDEDCATEGORIES = [
  "Home Lead Story",
  "Home Latest Stories",
  "Home Governance",
  "Home Interviews",
  "Home Laws",
  "Home Sector",
  "Home Social Stocks",
  "Home Sustainable World",
];

export const useFilteredCategories = (categories) => {
  return categories?.filter(
    (category) => !EXCLUDEDCATEGORIES.includes(category.name)
  );
};

export const useFilteredStories = (stories) => {
  return stories?.map((story) => {
    const filteredCategories = story?.categories?.filter(
      (category) => !EXCLUDEDCATEGORIES.includes(category.name)
    );
    return filteredCategories?.[0];
  });
};
