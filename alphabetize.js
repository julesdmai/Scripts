function alphabetize(text) {
  return text
    .split("\n")
    .filter((line) => line.trim())
    .sort((a, b) => a.trim().localeCompare(b.trim()))
    .join("\n");
}

// const sample = `  
//     draftFilters={draftFilters}
//     setDraftFilters={setDraftFilters}
//     applyFilters={applyFilters}
//     resetFilters={resetFilters}
//     canApply={canApply}
//     canReset={canReset}
//     openAdvFiltersModal={openAdvFiltersModal}
//     displayRange={displayRange}
// `;
// console.log(alphabetize(sample));

const str = `
    key={s.shift_id}
    index={index}
    shift_id={s.shift_id}
    user_name={s.name}
    member_number={s.member_number}
    minutes_logged={s.minutes_logged}
    start_time={s.start_time}
    end_time={s.end_time}
    project={s.project}
    notes={s.notes}
    openShiftDetailsModal={openShiftDetailsModal}
`
const results = alphabetize(str);
console.log(results);