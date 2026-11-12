export function calculateSplit(roommates, expenses) {
  const balances = Object.fromEntries(roommates.map((r) => [r, 0]));
  let total = 0;

  expenses.forEach(({ amount, paidBy, splitBetween }) => {
    total += amount;
    balances[paidBy] += amount;
    splitBetween.forEach((person) => {
      balances[person] -= amount / splitBetween.length;
    });
  });

  const debtors = [], creditors = [], settlements = [];
  Object.entries(balances).forEach(([person, net]) => {
    if (net < -0.01) debtors.push({ person, amt: -net });
    else if (net > 0.01) creditors.push({ person, amt: net });
  });

  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const min = Math.min(debtors[i].amt, creditors[j].amt);
    settlements.push({ from: debtors[i].person, to: creditors[j].person, amt: min });
    if ((debtors[i].amt -= min) < 0.01) i++;
    if ((creditors[j].amt -= min) < 0.01) j++;
  }

  return { balances, settlements, total };
}