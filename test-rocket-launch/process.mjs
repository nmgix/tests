export const process = (store, order) => {
  if (!store || store.length == 0 || !order || order.length == 0) return false;
  const stock = new Map();
  store.forEach(({ size, quantity }) => stock.set(size, quantity));
  const assignment = [];
  let mismatches = 0;
  const conflictHeap = [];

  // пройтись по одиночным size
  order.forEach(customer => {
    if (customer.masterSize !== undefined) {
      conflictHeap.push({ ...customer, sizesAvailable: 0 });
    } else {
      if (stock.has(customer.size[0]) && stock.get(customer.size[0]) > 0) {
        let chosenSize = customer.size[0];
        stock.set(chosenSize, stock.get(chosenSize) - 1);
        assignment.push({ id: customer.id, size: chosenSize });
      } else return false;
    }
  });

  // по size.length 2
  while (conflictHeap.length > 0) {
    const customer = conflictHeap.shift(); // забираем первый

    //   санитацию/валидацию оставляю на миддлвары "*бекенда*"", подразумевается что все необходимые поля на месте
    customer.sizesAvailable = [stock.has(customer.size[0]), stock.has(customer.size[1])].filter(v => v !== false).length; // проверяем кол-во доступных size  у него
    if (customer.sizesAvailable == 0) return false;
    if (conflictHeap.length > 0 && customer.sizesAvailable > conflictHeap[0]?.sizesAvailable) {
      // если у текущего больше доступных у первого
      conflictHeap.push(customer); // то закидываем текущий в heap обратно в конец
    } else {
      // если у текущего меньше или такой же sizesAvailable
      // то выдаём по master size сначала, потом другим отдаём alternative
      let chosenSize = null;
      const [s1, s2] = customer.size;
      const preferSize = customer.masterSize === "s1" ? s1 : s2;
      const altSize = customer.masterSize === "s1" ? s2 : s1;

      if (stock.has(preferSize) && stock.get(preferSize) > 0) chosenSize = preferSize;
      if (!chosenSize && stock.has(altSize) && stock.get(altSize) > 0) {
        chosenSize = altSize;
        mismatches++;
      }

      if (chosenSize === null) return false;
      stock.set(chosenSize, stock.get(chosenSize) - 1);
      assignment.push({ id: customer.id, size: chosenSize });
    }
  }

  // может случиться в 6м кейсе, где order[0].size.length == 0 и в итоге оба цикла скипаются
  // хотя в теории false не будет?
  //   if (assignment.length == 0) return false;

  const stats = Array.from(stock.entries())
    .map(([size, quantity]) => ({ size, quantity }))
    .filter(item => store.some(s => s.size === item.size)) // Оставляем только исходные размеры
    .sort((a, b) => a.quantity - b.quantity);

  //   console.log({ stats, assignment, mismatches });

  return { stats, assignment, mismatches };
};
