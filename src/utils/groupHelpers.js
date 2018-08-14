export function groupArgumentList(argumentList) {
  let groupArgumentList = []
  argumentList.forEach((element, i) => {
    let groupedIndex = parseInt(i / 2, 10)
    if (groupArgumentList.length === groupedIndex) {
      groupArgumentList.push([element])
    } else {
      groupArgumentList[groupedIndex].push(element)
    }
  })
  return groupArgumentList
}
