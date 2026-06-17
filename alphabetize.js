function alphabetize(text) {
  return text
    .split("\n")
    .filter((line) => line.trim())
    .sort((a, b) => a.trim().localeCompare(b.trim()))
    .join("\n");
}

const sample = `  
    draftFilters={draftFilters}
    setDraftFilters={setDraftFilters}
    applyFilters={applyFilters}
    resetFilters={resetFilters}
    canApply={canApply}
    canReset={canReset}
    openAdvFiltersModal={openAdvFiltersModal}
    displayRange={displayRange}
`;
console.log(alphabetize(sample));
