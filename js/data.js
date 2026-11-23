/* Sample data: cars, trip purposes, sizes, dates (no backend) */
const CARS = [
  { id:'sedan', name:'Sedan', model:'Toyota Corolla Hybrid', size:'Medium', seats:5, space:'Medium trunk', spaceLong:'Medium trunk · 2 suitcases', price:12,
    lot:'Library Lot', spot:'Spot 14', walk:5, street:'Behind Scott Library · marked car-share bays', fuel:'Hybrid · 80% charged', color:'#3f6fa5', pin:{x:24,y:24}, booked:[] },
  { id:'suv', name:'SUV', model:'Toyota Highlander', size:'Large', seats:7, space:'Large trunk', spaceLong:'Large trunk · fits 6–8 boxes', price:15,
    lot:'Lot A', spot:'Spot 3', walk:3, street:'University Ave · marked car-share bays', fuel:'Gas · Full tank', color:'#2c6e5b', pin:{x:76,y:22},
    booked:[{date:'2026-12-03', from:15, to:17}] },
  { id:'van', name:'Cargo Van', model:'Ford Transit Connect', size:'Large', seats:2, space:'Extra-large cargo area', spaceLong:'Cargo area · no back seats', price:20,
    lot:'Stong Lot', spot:'Spot 7', walk:8, street:'Stong Lot · east entrance', fuel:'Gas · 3/4 tank', color:'#b0632a', pin:{x:77,y:70}, booked:[] },
];
const CAR = id => CARS.find(c => c.id === id);
const PURPOSES = [
  { id:'Errands',  sub:'Groceries, quick trips', size:'Medium' },
  { id:'Moving',   sub:'Boxes, furniture',       size:'Large'  },
  { id:'Road Trip',sub:'Long drives, luggage',   size:'Medium' },
  { id:'Group 5+', sub:'5 or more people',       size:'Large'  },
];
const SIZES = [
  { id:'Small',  sub:'2–4 people' },
  { id:'Medium', sub:'Up to 5 people' },
  { id:'Large',  sub:'6–7 people or bags' },
];
const pad = n => String(n).padStart(2,'0');
const DATES = Array.from({length:7}, (_, i) => {
  const d = new Date(2026, 10, 30 + i);
  return { iso:`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`,
           label:d.toLocaleDateString('en-US', {weekday:'short', month:'short', day:'numeric'}) };
});
const dateLabel = iso => (DATES.find(d => d.iso === iso) || {label:iso}).label;
const fmtH = h => (h % 12 === 0 ? 12 : h % 12) + (h < 12 ? ' AM' : ' PM');
const range = (a, b) => Array.from({length:b - a + 1}, (_, i) => a + i);
const PAY = 'Visa •••• 4821';
