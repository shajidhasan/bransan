export const colors = [
  "#0066cc",
  "#775ada",
  "#e00543",
  "#01937C",
  "#ff9a00",
];

const getRandomColor = ():string => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export const processData = (
  data: ProgressData[],
  title: string
): ChartData[] => {
  let datasets: ChartData[] = [];
  let singleData: ChartData;
  let dataObject = {};
  for (let updateData of data) {
    let time = new Date(updateData.updatedOn.seconds * 1000);
    for (let book of updateData.data) {
      if (book.title in dataObject) {
        if (dataObject[book.title][0].y !== book.percentage) {
          dataObject[book.title].unshift({ x: time, y: book.percentage });
        }
      } else {
        dataObject[book.title] = [{ x: time, y: book.percentage }];
      }
    }
  }
  let found: boolean = false;
  for (const book in dataObject) {
    if (Object.prototype.hasOwnProperty.call(dataObject, book)) {
      const element = dataObject[book];
      if (book === title) {
        singleData = {
          label: book,
          data: element,
          borderColor: getRandomColor(),
          lineTension: 0.35,
        };
        found = true;
      }
      datasets.push({
        label: book,
        data: element,
        borderColor: getRandomColor(),
        lineTension: 0.35,
      });
    }
  }

  if (found) {
    return [singleData];
  }
  return datasets;
};
