$("document").ready(function () {
    // To Scientific Calculator
    let untTab = document.getElementById('unitsTab');
    let constTab = document.getElementsByClassName('constTD');
    let scaleTab = document.getElementById('scaleTab');
    let formTab = document.getElementsByClassName('funit');
    let clsTab = [constTab, formTab];

    const SclIdx = ",";
    var unitCard = false;
    const theLables = new Map();
    theLables.set('intens', 'Luminous Intensity');
    theLables.set('amount', 'Amount of Substance');
    theLables.set('temperature', 'Thermodynamic Temperature');
    theLables.set('current', 'Electric Current');
    theLables.set('mass', 'Mass');
    theLables.set('length', 'Linear Length');
    theLables.set('time', 'Time');
    theLables.set('angle', 'Linear Angle');
    const labls = [];
    for (let tScale of theLables.keys()) {
        labls.push(tScale);
    }

    // The combos of units
    const lablext = ['Radiation', 'Space', 'Momentum', 'ElectroMag', 'Thermo', 'Mass', 'Time', 'Angle'];
    const labelsTot = [];
    for (let lbs of lablext) {
        labelsTot.push(lbs);
    }
    labelsTot.push('physical');
    labelsTot.push('astron');
    const theUnits = new Map();
    theUnits.set('cd', [['candela', labls[0], '@', lablext[0]]]);
    theUnits.set('mol', [['mole', labls[1], '*', lablext[4]]]);
    theUnits.set('<sup>o</sup>K', [['kelvin', labls[2], 'K', lablext[4]]]);
    theUnits.set('<sup>o</sup>C', [['celsius', labls[2], 'C', lablext[4]], ['<sup>o</sup>K', 1.0, 273.15, 1]]);
    theUnits.set('<sup>o</sup>F', [['farenheit', labls[2], 'F', lablext[4]], ['<sup>o</sup>K', 5.0 / 9.0, 273.15 - 160.0 / 9.0, 1]]);
    theUnits.set('A', [['ampere', labls[3], 'A', lablext[3]]]);
    theUnits.set('g', [['gram', labls[4], 'g', lablext[5]]]); //, ['k,g', 1.0e-03, 0.0, 1]]);
    theUnits.set('Tn', [['ton', labls[4], 'T', lablext[5]], ['g', 1.0e06, 0.0, 1]]);
    theUnits.set('S', [['SunMass', labls[4], 'S', lablext[5]], ['g', 1.98855e33, 0.0, 1]]);
    theUnits.set('m', [['metre', labls[5], 'm', lablext[1]]]);
    theUnits.set('in', [['inch', labls[5], 'n', lablext[1]], ['m', 0.0254, 0.0, 1]]);
    theUnits.set('ft', [['foot', labls[5], 'f', lablext[1]], ['m', 0.3048, 0.0, 1]]);
    theUnits.set('yd', [['yard', labls[5], '`', lablext[1]], ['m', 0.9144, 0.0, 1]]);
    theUnits.set('mi', [['mile', labls[5], '8', lablext[1]], ['m', 1609.344, 0.0, 1]]);
    theUnits.set('nmi', [['nautical mile', labls[5], 'w', lablext[1]], ['m', 1852, 0.0, 1]]);
    theUnits.set('AA', [['angstron', labls[5], '-', lablext[1]], ['m', 1.0e-10, 0.0, 1]]);
    theUnits.set('AU', [['astronomic unit', labls[5], 'U', lablext[1]], ['m', 149597870700, 0.0, 1]]);
    theUnits.set('pc', [['parsec', labls[5], 'p', lablext[1]], ['m', 3.08567758146719e16, 0.0, 1]]);
    theUnits.set('ly', [['lightyear', labls[5], 'Y', lablext[1]], ['m', 299792458.0 * 365.25 * 24.0 * 3600.0, 0.0, 1]]);
    theUnits.set('sc', [['second', labls[6], 's', lablext[6]]]);
    theUnits.set('mn', [['minute', labls[6], 'u', lablext[6]], ['sc', 60.0, 0.0, 1]]);
    theUnits.set('hr', [['hour', labls[6], 'h', lablext[6]], ['sc', 3600.0, 0.0, 1]]);
    theUnits.set('dy', [['day', labls[6], 'a', lablext[6]], ['sc', 24.0 * 3600, 0.0, 1]]);
    theUnits.set('mth', [['month', labls[6], 'e', lablext[6]], ['sc', 30 * 24 * 3600, 0.0, 1]]);
    theUnits.set('yr', [['year', labls[6], 'y', lablext[6]], ['sc', 365.0 * 24.0 * 3600.0, 0.0, 1]]);
    theUnits.set('Jyr', [['julyear', labls[6], '?', lablext[6]], ['dy', 365.25, 0.0, 1]]);
    theUnits.set('Tyr', [['trpyear', labls[6], '[', lablext[6]], ['dy', 365.24219, 0.0, 1]]);
    theUnits.set('Gyr', [['grgyear', labls[6], ']', lablext[6]], ['dy', 365.2425, 0.0, 1]]);
    theUnits.set('Syr', [['sidyear', labls[6], '/', lablext[6]], ['dy', 365.256363004, 0.0, 1]]);
    theUnits.set('Cen', [['century', labls[6], 'c', lablext[6]], ['sc', 36525.636 * 24 * 3600, 0, 1]]);
    theUnits.set('rad', [['radian', labls[7], 'r', lablext[7]]]);
    theUnits.set('deg', [['degree', labls[7], 'o', lablext[7]], ['rad', Math.PI / 180, 0.0, 1]]);
    theUnits.set('min', [['minute', labls[7], '\'', lablext[7]], ['deg', 1.0 / 60, 0.0, 1]]);
    theUnits.set('sec', [['second', labls[7], '"', lablext[7]], ['min', 1.0 / 60.0, 0.0, 1]]);
    theUnits.set('grd', [['grad', labls[7], '0', lablext[7]], ['rad', Math.PI / 200.0, 0.0, 1]]);
    theUnits.set('hour', [['Hour', labls[7], 'H', lablext[7]], ['rad', Math.PI / 12, 0.0, 1]]);
    theUnits.set('hmin', [['Hmin', labls[7], '=', lablext[7]], ['hour', 1.0 / 60.0, 0.0, 1]]);
    theUnits.set('hsec', [['Hsec', labls[7], '+', lablext[7]], ['hmin', 1.0 / 60.0, 0.0, 1.0]]);
    theUnits.set('a', [['are', 'Surface', '9', lablext[1]], ['m', 10, 0, 2]]);
    theUnits.set('ac', [['acre', 'Surface', '$', lablext[1]], ['a', 40.468564224, 0, 1]]);
    theUnits.set('L', [['litre', 'Volume', 'L', lablext[1]], ['m', 0.1, 0, 3]]);
    theUnits.set('Bar', [['barrel', 'Volume', 'M', lablext[1]], ['L', 158.987294928, 0, 1]]);
    theUnits.set('Gal', [['gallon', 'Volume', 'G', lablext[1]], ['L', 3.785411784, 0, 1]]);
    theUnits.set('Pin', [['pint', 'Volume', 'P', lablext[1]], ['L', 0.473176473, 0, 1]]);
    theUnits.set('Hz', [['hertz', "Frequency", 'z', lablext[6]], ['sc', 1, 0, -1]]);
    theUnits.set('kt', [['knot', "Speed", ".", lablext[2]], ['nmi', 1.0, 0, 1], ['hr', 1, 0, -1]]);
    theUnits.set('M', [['mach', "Speed", ">", lablext[2]], ['m', 340.0, 0, 1], ['sc', 1, 0, -1]]);
    theUnits.set('c', [['lightSpeed', "Speed", "^", lablext[2]], ['m', 299792458, 0, 1], ['sc', 1, 0, -1]]);
    theUnits.set('grav', [['gravity', 'Acceleration,Potential Field', 'x', lablext[2]], ['m', 9.80665, 0, 1], ['sc', 1, 0, -2]]);
    theUnits.set('N', [['newton', "Force,Weight", 'N', lablext[2]], ['k,g', 1, 0, 1], ['m', 1, 0, 1], ['sc', 1, 0, -2]]);
    theUnits.set('Pa', [['pascal', "Pressure,Stress", '4', lablext[2]], ['N', 1, 0, 1], ['m', 1, 0, -2]]);
    theUnits.set('bar', [['bar', "Pressure", '6', lablext[2]], ['Pa', 100000, 0, 1]]);
    theUnits.set('atm', [['atmosphere', "Pressure", '~', lablext[2]], ['Pa', 101325, 0, 1]]);
    theUnits.set('J', [['joule', "Energy,Work,Heat", 'j', lablext[2]], ['N', 1, 0, 1], ['m', 1, 0, 1]]);
    theUnits.set('erg', [['erg', "Energy,Work,Heat", '7', lablext[2]], ['J', 1e-07, 0, 1]]);
    theUnits.set('cal', [['calorie', "Energy,Work,Heat", 'q', lablext[4]], ['J', 4.184, 0, 1]]);
    theUnits.set('eV', [['electron volt', "Energy,Work,Heat", 'v', lablext[2]], ['J', 1.602176634e-19, 0, 1]]);
    theUnits.set('TNT', [['ton', "Energy,Work,Heat", 'N', lablext[2]], ['cal', 1.0e9, 0, 1]]);
    theUnits.set('hp', [['horse-power', 'Power,Radiant Flux', '2', lablext[2]], ['W', 745.6987158227022, 0, 1]]);
    theUnits.set('W', [['watt', "Power,Radiant Flux", 't', lablext[2]], ['J', 1, 0, 1], ['sc', 1, 0, -1]]);
    theUnits.set('C', [['coulomb', "Electric charge", '5', lablext[3]], ['sc', 1, 0, 1], ['A', 1, 0, 1]]);
    theUnits.set('V', [['volt', "Electric Potential,Voltage,EMF", 'V', lablext[3]], ['W', 1, 0, 1], ['A', 1, 0, -1]]);
    theUnits.set('Frd', [['farad', "Capacitance", 'd', lablext[3]], ['C', 1, 0, 1], ['V', 1, 0, -1]]);
    theUnits.set('&Omega;', [['ohm', "Resistance,Impedance,Reactance", 'O', lablext[3]], ['V', 1, 0, 1], ['A', 1, 0, -1]]);
    theUnits.set('Siem', [['siemens', "Electrical conductance", '3', lablext[3]], ['&Omega;', 1, 0, -1]]);
    theUnits.set('Wb', [['weber', "Magnetic Flux", 'B', lablext[3]], ['V', 1, 0, 1], ['sc', 1, 0, 1]]);
    theUnits.set('Tes', [['tesla', "Magnetic Flux Density", '1', lablext[3]], ['Wb', 1, 0, 1], ['m', 1, 0, -2]]);
    theUnits.set('H', [['henry', "Inductance", 'b', lablext[3]], ['k,g', 1, 0, 1], ['Wb', 1, 0, 1], ['A', 1, 0, -1]]);
    theUnits.set('lm', [['lumen', "Luminous Flux", 'W', lablext[0]], ['cd', 1, 0, 1], ['rad', 1, 0, 2]]);
    theUnits.set('lx', [['lux', "Illuminance", 'I', lablext[0]], ['cd', 1, 0, 1], ['rad', 1, 0, 2], ['m', 1, 0, -2]]);
    theUnits.set('Bq', [['becquerel', "Radioactivity", 'k', lablext[0]], ['sc', 1, 0, -1]]);
    theUnits.set('Gy', [['gray', "Absorbed ionising radiation", 'R', lablext[0]], ['J', 1, 0, 1], ['k,g', 1, 0, -1]]);
    theUnits.set('Sv', [['slevert', "Equivalent absorbed radiation", 'D', lablext[0]], ['J', 1, 0, 1], ['k,g', 1, 0, -1]]);
    theUnits.set('kat', [['katal', "Catalytic Activity", 'J', lablext[4]], ['mol', 1, 0, 1], ['sc', 1, 0, -1]]);
    // Units set in the selection inputs
    var xUnit = new Map();
    var yUnit = new Map();
    var zUnit = new Map();
    var tUnit = new Map();
    var backX;
    var backXUnit = new Map();
    // Units in the registers
    var xRegUnit = document.getElementById('untX');
    //    xUnits.innerHTML = 'km';   // Put labels on xUnits
    var yRegUnit = document.getElementById('untY');
    var zRegUnit = document.getElementById('untZ');
    var tRegUnit = document.getElementById('untT');
    const ctrlKeys = new Map();
    const swapMap = new Map();
    theUnits.forEach((values, keys) => {
        ctrlKeys.set(values[0][2], keys);
        let op = document.createElement('option');
        op.value = keys;
        op.innerHTML = keys;
        op.title = values[0][0] + ": " + values[0][1]
                + "; PgDwn-" + values[0][2];
        let selUnits;
        selUnits = document.getElementById(values[0][3]);
        //        } else {
        //            selUnits = document.getElementById('derived');
        selUnits.appendChild(op);
    });
    const Scale = new Map();
    Scale.set('q', ["quecto", -30, 'q']);
    Scale.set('r', ["ronto", -27, 'r']);
    Scale.set('y', ["yocto", -24, 'y']);
    Scale.set('z', ["zepto", -21, 'z']);
    Scale.set('a', ["atto", -18, 'a']);
    Scale.set('f', ["femto", -15, 'f']);
    Scale.set('p', ["pico", -12, 'p']);
    Scale.set('n', ["nano", -9, 'n']);
    Scale.set('u', ["micro", -6, 'u']);
    Scale.set('m', ["milli", -3, 'm']);
    Scale.set('c', ["centi", -2, 'c']);
    Scale.set('d', ["deci", -1, 'd']);
    Scale.set('D', ["deca", 1, 'D']);
    Scale.set('h', ["hecto", 2, 'h']);
    Scale.set('k', ["kilo", 3, 'k']);
    Scale.set('M', ["Mega", 6, 'M']);
    Scale.set('G', ['Giga', 9, 'G']);
    Scale.set('T', ["Tera", 12, 'T']);
    Scale.set('P', ["Peta", 15, 'P']);
    Scale.set('E', ["Exa", 18, 'E']);
    Scale.set('Z', ["Zetta", 21, 'Z']);
    Scale.set('Y', ["Yotta", 24, 'Y']);
    Scale.set('R', ["ronna", 27, 'R']);
    Scale.set('Q', ["quetta", 30, 'Q']);
    const scaleKeys = new Map();
    Scale.forEach((values, key) => {
        let op = document.createElement('option');
        op.value = values[1];
        op.innerHTML = key;
        op.title = values[0] + "=10^" + values[1] + "; End-" + values[2];
        let selValues = document.getElementById("scale");
        selValues.appendChild(op);
        scaleKeys.set(values[2], key);
    });
    let tScale = "";
    const physConst = new Map();
    physConst.set('A<sub>P</sub>', ['alpha particle mass', 6.6446573357e-27, 'A', ['k,g', 1]]);
    physConst.set('A*', ['angstron star', 1.00001495e-10, '*', ['m', 1]]);
    physConst.set('m<sub>a</sub>', ['atomic mass', 1.66053906660e-27, 'a', ['k,g', 1]]);
    physConst.set('N<sub>A</sub>', ['Avogadro constant', 6.02214076e23, 'N', ['mol', -1]]);
    physConst.set('&mu;<sub>B</sub>', ['Bohr magneton', 9.2740100783e-24, 'b', ['J', 1], ['Tes', -1]]);
    physConst.set('a<sub>0</sub>', ['Bohr radius', 5.29177210903e-11, 'B', ['m', 1]]);
    physConst.set('k<sub>B</sub>', ['Boltzmann constant', 1.380649e-23, 'K', ['J', 1], ['<sup>o</sup>K', -1]]);
    physConst.set('Z<sub>0</sub>', ['impedance of vacuum', 376.730313668, 'w', ['&Omega;', 1]]);
    physConst.set('r<sub>e</sub>', ['electron radius', 2.8179403262e-15, '!', ['m', 1]]);
    physConst.set('D<sub>M</sub>', ['deuteron mass', 3.3435837724e-27, 'Q', ['k,g', 1]]);
    physConst.set('m<sub>e</sub>', ['electron mass', 9.1093837015e-31, 'e', ['k,g', 1]]);
    physConst.set('eV', ['electron volt', 1.602176634e-19, 'v', ['J', 1]]);
    physConst.set('e', ['elementary charge', 1.602176634e-19, 'q', ['C', 1]]);
    physConst.set('<i>F</i>', ['Faraday constant', 96485.33212, 'F', ['C', 1], ['mol', -1]]);
    physConst.set('&alpha;', ['fine-structure constant', 7.2973525693e-3, 'f']);
    physConst.set('E<sub>h</sub>', ['Hartree energy', 4.3597447222071e-18, 'T', ['J', 1]]);
    physConst.set('<i>K</i>', ['Josephson constant', 483597.8484e9, 'l', ['Hz', 1], ['V', -1]]);
    physConst.set('a', ['lattice parameter Si', 5.431020511e-10, 't', ['m', 1]]);
    physConst.set('R', ['molar gas constant', 8.314462618, 'R', ['J', 1], ['mol', -1], ['<sup>o</sup>K', -1]]);
    physConst.set('&mu;<sub>N</sub>', ['nuclear magneton', 5.0507837461e-27, '(', ['J', 1], ['Tes', -1]]);
    physConst.set('h', ['Planck constant', 6.62607015e-34, 'h', ['J', 1], ['Hz', -1]]);
    physConst.set('P', ['proton mass', 1.67262192369e-27, '&', ['k,g', 1]]);
    physConst.set('R<sub>&infin;</sub>', ['Rydberg constant', 10973731.568160, 'x', ['m', -1]]);
    physConst.set('c', ['speed of light', 299792458, 'c', ['m', 1], ['sc', -1]]);
    physConst.set('g', ['acceleration of gravity', 9.80665, 'g', ['m', 1], ['sc', -2]]);
    physConst.set('Atm', ['standard atmosphere', 101325, 'm', ['Pa', 1]]);
    physConst.set('&Sigma;', ['Stefan-Boltzmann constant', 5.670374419e-8, 's', ['W', 1], ['m', -2], ['<sup>o</sup>K', -4]]);
    physConst.set('&varepsilon;<sub>0</sub>', ['electric permittivity', 8.8541878128e-12, 'n', ['Frd', 1], ['m', -1]]);
    physConst.set('&mu;', ['magnetic permeability', 1.25663706212e-6, 'X', ['N', 1], ['A', -2]]);
    physConst.set('R<sub>k</sub>', ['von Klitzing constant', 25812.80745, 'V', ['&Omega;', 1]]);
    const altKeys = new Map();
    function setupConst(Const, cnst) {
        const sel = document.getElementById(cnst);
        Const.forEach((arrV, k) => {
            altKeys.set(arrV[2], [k, cnst]);
            //            console.log("altKeys.set('" + arrV[2] + "',['" + k + "','" + cnst + "']):");
            //            console.log(cnst,";",arrV[0],";",k,";",arrV[2],":");
            let opt = document.createElement('option');
            opt.value = k;
            opt.innerHTML = k;
            opt.title = arrV[0] + "; PgUp-" + arrV[2];
            sel.appendChild(opt);
        });
    }

    setupConst(physConst, 'physical');
    const astrConst = new Map();
    astrConst.set('AU', ['Astronomical Unit', 149597870700, 'U', ['m', 1]]);
    astrConst.set('pc', ['parsec', 3.08567758146719e16, 'p', ['m', 1]]);
    astrConst.set('Kpc', ['kiloparsec', 3.08567758146719e19, 'P', ['m', 1]]);
    astrConst.set('Mpc', ['megaparsec', 3.08567758146719e22, 'M', ['m', 1]]);
    astrConst.set('ly', ['lightyear', 299792458.0 * 365.25 * 24.0 * 3600.0, 'Y', ['m', 1]]);
    astrConst.set('mdj0', ['Modified Julian Day', 2400000.5, 'j', ['dy', 1]]);
    astrConst.set('JulYr', ['Julian Year', 365.25, 'J', ['dy', 1]]);
    astrConst.set('JulCy', ['Julian Century', 36525, 'y', ['dy', 1]]);
    astrConst.set('J2000.0', ['Epoch 2000-Jan-1.5TD', 2451545.0, '0', ['dy', 1]]);
    astrConst.set('B1950.0', ['Besselian Epoch', 2433282.42350, '%', ['dy', 1]]);
    astrConst.set('Syr', ['Sidereal Year', 365.256363004, '/', ['dy', 1]]);
    astrConst.set('Tyr', ['Tropical Year', 365.24219, '[', ['dy', 1]]);
    astrConst.set('Gyr', ['Gregorian Year', 365.2425, ']', ['dy', 1]]);
    astrConst.set('g', ['acceleration of gravity', 9.80665, 'g', ['m', 1], ['sc', -2]]);
    astrConst.set('G', ['constant of gravitation', 6.67428e-11, 'G', ['m', 3], ['k,g', -1], ['sc', -2]]);
    astrConst.set('S', ['mass of sun', 1.98855e30, 'S', ['k,g', 1]]);
    astrConst.set('k', ['Gaussian gravitational constant', 8.16935106e-06, 'k', ['m', 1.5], ['k,g', -0.5], ['sc', -1], ['rad', 1]]);
    astrConst.set('R<sub>e</sub>', ['Equatorial radius for Earth', 6.3781366e6, 'O', ['m', 1]]);
    astrConst.set('e', ['earth ellipticity', 0.0033528197, 'i']);
    astrConst.set('GE', ['Geocentric gravitational constant', 3.986004391e14, 'D', ['m', 3], ['sc', -2]]);
    astrConst.set('1/&mu;', ['earth mass / moon mass', 81.30056, 'u']);
    astrConst.set('&rho;', ['Precession in longitude', 0.02438029195, 'r', ['rad', 1], ['Cen', -1]]);
    astrConst.set('m', ['Precession term in m', 3.075, 'Z', ['sec', 1], ['yr', -1]]);
    astrConst.set('n', ['Precession term in n', 20.043, 'z', ['sec', 1], ['yr', -1]]);
    astrConst.set('&epsilon;', ['Obliquity of ecliptic', 0.408990551, 'o', ['rad', 1]]);
    astrConst.set('&varepsilon;', ['Sidereal rate', 365.25 / 366.25, ':']);
    astrConst.set("<i>N</i>", ['Constant of nutation', 0.0000446282294, '2', ['rad', 1]]);
    astrConst.set('&kappa;', ['Constant of aberration', 20.49552, '1', ['sec', 1]]);
    astrConst.set('GS', ['Heliocentric gravitational constant', 1.3272440e20, 'L', ['m', 3], ['sc', -2]]);
    astrConst.set('S/E', ['sun mass / earth mass', 332946.050895, 'E']);
    astrConst.set('S/E+M', ['sun mass / earth+moon mass', 328900.561400, '#']);
    astrConst.set('H<sub>0</sub>', ['Hubble constant', 70.1, 'H', ['k,m', 1], ['sc', -1], ['M,pc', -1]]);
    astrConst.set('L<sub>0</sub>', ['Solar luminosity', 3.939e26, 'W', ['W', 1]]);
    setupConst(astrConst, 'astron');
    const planets = ['Mercury', 'Venus', 'Earth', 'Moon', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
    const titPlanets = ['To the barycenter of the solar system', 'To the barycenter of the earth-moon system'];
    const planetUnits = new Map();
    planetUnits.set('osculating', ['Osculating date (Planets) or Perihelion Epoch (Comets)', 1, ['dy', 1]]);
    planetUnits.set('pmass', ['Mass', 1.0e24, ['k,g', 1]]);
    planetUnits.set('diameter', ['Diameter', 1, ['k,m', 1]]);
    planetUnits.set('density', ['Density', 1, ['k,g', 1], ['m', -3]]);
    planetUnits.set('gravity', ['Gravity', 1, ['m', 1], ['sc', -2]]);
    planetUnits.set('escape', ['Escape velocity', 1, ['k,m', 1], ['sc', -1]]);
    planetUnits.set('rotation', ['Rotation Period', 1, ['hr', 1]]);
    planetUnits.set('day', ['Length of Day', 1, ['hr', 1]]);
    planetUnits.set('fromsun', ['Distance from Sun', 1.0e6, ['k,m', 1]]);
    planetUnits.set('perihelion', ['Perihelion', 1.0e6, ['k,m', 1]]);
    planetUnits.set('aphelion', ['Aphelion', 1.0e6, ['k,m', 1]]);
    planetUnits.set('orbital', ['Orbital Period', 1, ['dy', 1]]);
    planetUnits.set('semimajor', ['Semimajor Axis', 1, ['AU', 1]]);
    planetUnits.set('eccentricity', ['Eccentricity']);
    planetUnits.set('inclination', ['Orbital Inclination', 1, ['deg', 1]]);
    planetUnits.set('ascending', ['Longitude of ascending node', 1, ['deg', 1]]);
    planetUnits.set('perilong', ['Longitude of perihelion', 1, ['deg', 1]]);
    planetUnits.set('longmean', ['Mean Longitude', 1, ['deg', 1]]);
    planetUnits.set('obliquity', ['Obliquity to Orbit', 1, ['deg', 1]]);
    planetUnits.set('plantemp', ['Mean Temperature', 1, ['<sup>o</sup>C', 1]]);
    planetUnits.set('moons', ['Number of Moons']);
    planetUnits.set('mag', ['Visual Magnitude']);
    const planetData = new Map();
    planetData.set('osculating', [2451545.0, 2451545.0, 2451545.0, 0.0, 2451545.0, 2451545.0, 2451545.0, 2451545.0, 2451545.0, 2451545.0]);
    planetData.set('pmass', [0.33010, 4.8673, 5.9722, 0.07346, 0.64169, 1898.13, 568.32, 86.8, 102.409, 0.01303]);
    planetData.set('diameter', [4879, 12104, 12576, 3475, 6792, 142984, 120536, 51118, 49528, 2376]);
    planetData.set('density', [5429, 5243, 5514, 3340, 3934, 1326, 687, 1270, 1638, 1850]);
    planetData.set('gravity', [3.7, 8.9, 9.8, 1.6, 3.7, 23.1, 9.0, 8.7, 11.0, 0.7]);
    planetData.set('escape', [4.3, 10.4, 11.2, 2.4, 5.0, 59.5, 35.5, 21.3, 23.5, 1.3]);
    planetData.set('rotation', [1407.6, -5832.5, 23.9, 655.7, 24.6, 9.9, 10.7, -17.2, 16.1, -153.3]);
    planetData.set('day', [4222.6, 2802.0, 24.0, 708.7, 24.7, 9.9, 10.7, 17.2, 16.1, 153.3]);
    planetData.set('fromsun', [57.9, 108.2, 149.6, 0.384, 228.0, 778.5, 1432.0, 2867.0, 4515.0, 5906.4]);
    planetData.set('perihelion', [46.0, 107.5, 147.1, 0.363, 206.7, 740.6, 1357.6, 2732.7, 4471.1, 4436.8]);
    planetData.set('aphelion', [69.8, 108.9, 152.1, 0.406, 249.3, 816.4, 1506.5, 3001.4, 4558.9, 7375.9]);
    planetData.set('orbital', [88.0, 224.7, 365.2, 27.3, 687.0, 4331, 10747, 30589, 59800, 90560]);
    planetData.set('semimajor', [0.38709893, 0.72333199, 1.00000011, 0.0025696, 1.52366231, 5.20336301, 9.53707032, 19.19126393, 30.06896348, 39.48168677]);
    planetData.set('eccentricity', [0.20563069, 0.00677323, 0.01671022, 0.0549, 0.09341233, 0.04839266, 0.05415060, 0.04716771, 0.00858587, 0.24880766]);
    planetData.set('inclination', [7.00487, 3.39471, 0.00005, 5.145, 0, 1.85061, 1.30530, 2.48446, 0.76986, 1.76917, 17.14175]);
    planetData.set('ascending', [48.33167, 76.68069, -11.26064, 0, 49.57854, 100.55615, 113.71504, 74.22988, 131.72169, 110.30347]);
    planetData.set('perilong', [77.45645, 131.53298, 102.94719, 0, 336.04084, 14.75385, 92.43194, 170.96424, 44.97135, 224.06676]);
    planetData.set('longmean', [252.25084, 181.97973, 100.46435, 0, 355.45332, 34.40438, 49.94432, 313.23218, 304.88003, 238.92881]);
    planetData.set('obliquity', [0.034, 177.4, 23.4, 6.7, 25.2, 3.1, 26.7, 97.8, 28.3, 122.5]);
    planetData.set('plantemp', [167, 464, 15, -20, -65, -110, -140, -195, -200, -225]);
    planetData.set('moons', [0, 0, 1, 0, 2, 79, 82, 27, 14, 5]);
    planetData.set('mag', [-0.613, -4.384, -3.99, +0.28, -1.601, -9.395, -8.914, -7.110, -7.00, -1.0]);
    const sel = document.getElementById('planet');
    planets.forEach((v, i) => {
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = v;
        if (v === 'Moon')
            opt.title = titPlanets[1];
        else
            opt.title = titPlanets[0];
        sel.appendChild(opt);
    });
    const NotMap = new Map();
    NotMap.set('F', "fxd");
    NotMap.set('S', "sci");
    NotMap.set('E', "eng");
    const memreg = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0', '0');
    const UnMemR = new Array(new Map(), new Map(), new Map(), new Map(), new Map(), new Map(), new Map(), new Map(), new Map(), new Map());
    const fkeys = new Map();
    const fixNot = 0;
    const expNot = 1;
    const engiNot = 2;
    var nPrecDigts = getDigits();
    var actNot = getNotation();
    setOpek();
    invOpe(0);
    var regX = document.getElementById("X");
    var valX = regX.value;
    var regY = document.getElementById("Y");
    var valY = regY.value;
    var regZ = document.getElementById("Z");
    var valZ = regZ.value;
    var regT = document.getElementById("T");
    var valT = regT.value;
    var exponent = "";
    var mantissa = "";
    var isExpo = false;
    var virgin = true;
    var entered = true;
    const defltShftClr = '#f5c1be';
    const altrnShftClr = 'grey';
    const hoverShftClr = '#c2f5be';
    const altrHShftClr = 'blue';
    const sclHShftClr = 'magenta';
    const sclNaltClr = '#c3a2b1';
    // Map of switching buttons to units, constants and so on
    const butmap = new Map();
    butmap.set('inv', false);
    butmap.set('sto', false);
    butmap.set('rcl', false);
    butmap.set('ctl', false);
    butmap.set('alt', false);
    butmap.set('end', false);
    butmap.set('fmt', false);
    // Map of units to be inverted when flushing units to register-X
    const invmap = new Array();
    resetLables();
    const stobut = tgglctl1("sto");
    const rclbut = tgglctl1("rcl");
    chgNot(); // Set all registers with adopted notation
    [xRegUnit, yRegUnit, zRegUnit, tRegUnit].forEach((v, i) => {
        clnUntInReg(v);
    });

    // Setup the map sclMp to have the last chosen scale if so
    const sclMp = new Map();
    var lstScl = 'none';
    var sclSel = document.getElementById('scale');
    sclSel.onchange = function (e) {
        var selOpt = this[this.selectedIndex];
        lstScl = selOpt.text;
    };

    // Populate sclMp to be retrieved when flushing units into register-X or Convertion
    for (let lbs of lablext) {
        var slun = document.getElementById(lbs);
        slun.onchange = function (e) {
            var su = this[this.selectedIndex];
            let arrUn2sc = theUnits.get(su.text);
            SclsNUnts(su.text);
            /*
             let Un2sc = arrUn2sc[0][3];
             let un2sc = document.getElementById(Un2sc);
             if (lstScl !== 'none') {
             sclMp.set(su.text, lstScl);
             sclSel.selectedIndex = 0;
             lstScl = 'none';
             un2sc.style.backgroundColor = sclHShftClr;
             }
             untTab.style.backgroundColor = 'transparent'; // reset back color
             butmap.set('ctl', false); // reset butmap state for unit definition
             resetButtonColor(); // reset button to its color
             if (butmap.get('inv')) {
             invmap.push(su.text);
             butmap.set('inv', false);
             un2sc.style.backgroundColor = altrnShftClr;
             }
             */
        };
        untTab.style.backgroundColor = 'transparent'; // reset back color
        butmap.set('ctl', false); // reset butmap state for unit definition
        resetButtonColor(); // reset button to its color
        virgin = false;
        entered = true;
        invOpe(0);
    }

    // Upload denoted physical constant
    $("#upldPhys").click(function () {
        upLoadCnst('physical', physConst);
    });

    // Upload denotes astronomical constant
    $("#upldAstr").click(function () {
        upLoadCnst('astron', astrConst);
    });

    // Upload a denoted planet physical paramenter
    $(".planets").click(function () {
        // Retrieve the id of the clicked part of class planets
        // and get the element
        //        let r = document.getElementById($(this).attr('id'));
        upLoadPlanets($(this).attr('id'));
        entered = true;
    });

    // Upload denoted planet osculating paramenter
    $(".elements").click(function () {
        //        let r = document.getElementById($(this).attr('id'));
        //        upLoadPlanets(r.id);
        upLoadPlanets($(this).attr('id'));
        entered = true;
    });

    // Upload denoted asteroid's orbital element
    $(".asteroids").click(function () {
        let id = $(this).attr('id');
        let selA = document.getElementById('asteroid').value;
        if (selA !== 'null') {
            let idx = asteroids.get('Name').indexOf(id);
            if (butmap.get("sto") && (selA === 'GENERIC')) {
                asteroids.get(selA)[idx] = valX;
                virgin = true;
                butmap.set('sto', false);
                stobut.style.backgroundColor = 'white';
            } else {
                pushUpPile();
                backX = valX;
                valX = asteroids.get(selA)[idx];
                let unt = asteroids.get('units')[idx];
                regX.value = fmtReg(valX);
                resetPop(xUnit, xRegUnit);
                if (unt.length > 0) {
                    resetCpyUnts(xUnit, backXUnit);
                    //                cpySetUnts(xUnit, backXUnit);
                    xUnit.set(unt, 1);
                    setUntsPop(xUnit, xRegUnit);
                }
            }
        }
        recvOper();
        entered = true;
    });

    // Upload denoted comet's orbital element
    $(".comets").click(function () {
        let id = $(this).attr('id');
        let selC = document.getElementById('comet').value;
        if (selC !== 'null') {
            let idx = comets.get('Name').indexOf(id);
            if (butmap.get("sto") && (selC === '0/GENERIC')) {
                comets.get(selC)[idx] = valX;
                virgin = true;
                butmap.set('sto', false);
                stobut.style.backgroundColor = 'white';
            } else {
                pushUpPile();
                let unt;
                if (idx < 6) {
                    backX = valX;
                    valX = comets.get(selC)[idx];
                    unt = comets.get('units')[idx];
                } else {
                    let tp = comets.get(selC)[idx];
                    let yr = Number(tp.substring(0, 4));
                    let mn = Number(tp.substring(4, 6));
                    let dd = Number(tp.substring(6));
                    valX = gregorian2julianday([dd, mn, yr]);
                    unt = 'dy';
                }
                regX.value = fmtReg(valX);
                resetCpyUnts(xUnit, backXUnit);
                resetPop(xUnit, xRegUnit);
                if (unt.length > 0) {
                    xUnit.set(unt, 1);
                    setUntsPop(xUnit, xRegUnit);
                }
            }
        }
        recvOper();
        entered = true;
    });


    function resetLables() {
        theLables.forEach((v, k) => {
            butmap.set(k, false);
        });
        butmap.set('derived', false);
    }

    function upLoadPlanets(x) {
        let selP = document.getElementById('planet').value;
        if (selP !== 'null') {
            resetCpyUnts(xUnit, backXUnit);
            pushUpPile();
            resetPop(xUnit, xRegUnit);
            let arrPlDat = planetData.get(x);
            backX = valX;
            valX = arrPlDat[Number(selP)];
            let arrUnts = planetUnits.get(x);
            if (arrUnts.length > 1) {
                let fact = arrUnts[1];
                valX *= fact;
                for (let i = 2; i < arrUnts.length; i++) {
                    let unK = arrUnts[i][0];
                    let unE = arrUnts[i][1];
                    xUnit.set(unK, unE);
                }
            }
            regX.value = fmtReg(valX);
            setUntsPop(xUnit, xRegUnit);
            recvOper();
            rvrsOpe();
            cleanUnitsConst();
        }
    }

    function upLoadCnst(sellct, cnst) {
        let selC = document.getElementById(sellct).value; // Selected phys/astro constant
        if (selC !== 'null') {
            getConsts(selC, cnst);
        }
        rvrsOpe();
        recvOper();
    }

    function getConsts(k, Cons) {
        pushUpPile();
        resetPop(xUnit, xRegUnit);
        let arrV = Cons.get(k);
        let valCPhys = arrV[1];
        backX = valX;
        valX = valCPhys;
        resetCpyUnts(xUnit, backXUnit);
        for (let i = 3; i < arrV.length; i++) {
            let arrU = arrV[i];
            let kUn = arrU[0];
            let expU = arrU[1];
            xUnit.set(kUn, expU);
        }
        regX.value = fmtReg(valX);
        setUntsPop(xUnit, xRegUnit);
        recvOper();
        cleanUnitsConst();
    }

    // Copy units of a register into another one
    function cpySetUnts(Un1, Un2) {
        //        resetUnit(Un2);
        Un1.forEach((v, i) => {
            if (Un2.has(i)) {
                let u = Un2.get(i);
                v += u;
            }
            if (v !== 0) {
                Un2.set(i, v);
            } else {
                Un2.delete(i);
            }
        });
    }

    // Reset target hash and copy source to it
    function resetCpyUnts(Un1, Un2) {
        resetUnit(Un2);
        Un1.forEach((v, i) => {
            Un2.set(i, v);
        });
    }

    // Populate Units registers from selection combos
    function poplUnts(Unt) {
        lablext.forEach((uv, uk) => {
            let v = document.getElementById(uv).value;
            if (v !== 'null') {
                /*
                 let sc = document.getElementById("scale");
                 let s = Number(sc.value);
                 if (s !== 0) {
                 tScale = sc.options[sc.selectedIndex].text + ',';
                 regX.value = fmtReg(valX);
                 }
                 */
                let ex;
                if (!Unt.has(v))
                    ex = 0;
                else
                    ex = Unt.get(v);
                if (invmap.indexOf(v) >= 0) {
                    ex--;
                    invmap.splice(invmap.indexOf(v), 1);
                } else
                    ex++;
                if (sclMp.has(v)) {
                    v = sclMp.get(v) + ',' + v;
                    sclMp.delete(v);
                }
                if (ex === 0) {
                    Unt.delete(v);
                } else {
                    Unt.set(v, ex);
                }
            }
        });
    }

    function untXPad() {
        let bfUnit = new Map();
        poplUnts(xUnit);
//                cpySetUnts(bfUnit, xUnit);
        clnUntInReg(xRegUnit);
        setUntsPop(xUnit, xRegUnit);
        //        rvrsOpe();
        recvOper();
        invOpe(0);
        cleanUnitsConst();
    }

    /**
     * To be used in new convert process
     * @returns Populated unit from combos
     */
    function untVPad() {
        //        clnUntInReg(xRegUnit);
        butmap.set('inv', false);
        let bfUnit = new Map();
        poplUnts(bfUnit);
        //        cpySetUnts(bfUnit, xUnit);
        //        setUntsPop(xUnit, xRegUnit);
        //        rvrsOpe();
        recvOper();
        invOpe(0);
        cleanUnitsConst();
        return bfUnit;
    }
    // Click on the x-units field
    $("#untX").click(function () {
        untXPad();
        resetAllCtrlKeys();
    });
    function resetUnit(Unit) {
        Unit.clear();
    }

    // reset all units to exponent null
    function resetPop(UnSet, iUnt) {
        UnSet.clear();
        clnUntInReg(iUnt);
    }

    // Populate the register UntReg from the set of units from the selections UntSet
    function setUntsPop(UntSet, UntReg) {
        UntSet.forEach((expo, uni) => {
            if (expo !== 0) {
                if (UntReg.innerHTML.length > 0) {
                    UntReg.innerHTML += '.';
                }
                UntReg.innerHTML += trmUn(uni);
                if ((expo !== 1) && (expo !== 0))
                    UntReg.innerHTML += "<sup>" + expo + "</sup>";
            }
        });
    }

    // Trim the string output from the comma indicating scaling
    function trmUn(un) {
        return un.replace(',', '');
    }

    function coalsconv() {
        backX = valX;
        let xCard = xUnit.size;
        unitCard = (xCard === 1);
        resetCpyUnts(xUnit, backXUnit);
        if (butmap.get('inv')) {
            convert();
        } else {
            valX = coalesce(xUnit, valX);
            regX.value = fmtReg(valX);
            clnUntInReg(xRegUnit);
            setUntsPop(xUnit, xRegUnit);
        }
        clnvars();
        cleanUnitsConst();
        recvOper();
        rvrsFOpe();
    }

    // Verify if the Unit is totally coalesced
    function isCoalesced(Unit) {
        let rv = true;
        Unit.forEach((expo, uni) => {
            let arrU = new Map();
            if (expo !== 0) {
                arrU = theUnits.get(uni);
                if (arrU.length > 1) {
                    rv &= false;
                }
            }
        });
        return rv;
    }

    // Button COALESCE
    $("#coals").click(function () {
        coalsconv();
    });
    function coalesce(Unit, val) {
        val = scaleReg(Unit, val);
        //        let bcUnit = new Map();
        Unit.forEach((expo, uni) => {
            if (expo !== 0) {
                let arrv = theUnits.get(uni);
                if (arrv.length > 1) {
                    for (let k = 1; k < arrv.length; k++) {
                        let K = arrv[k][1];
                        let b = arrv[k][2];
                        let u = arrv[k][0];
                        let sexp = 0;
                        if (!(u.search(SclIdx) < 0)) {
                            let ru = u.split(SclIdx);
                            sexp = Scale.get(ru[0])[1];
                            u = ru[1];
                        }
                        let vexpo = expo * arrv[k][3];
                        val *= Math.pow(K, vexpo);
                        if (unitCard)
                            val += b;
                        val *= Math.pow(10, sexp * vexpo);
                        if (Unit.has(u)) {
                            let iexpo = Unit.get(u);
                            if (vexpo + iexpo === 0)
                                Unit.delete(u);
                            else
                                Unit.set(u, vexpo + iexpo);
                        } else {
                            Unit.set(u, vexpo);
                        }
                    }
                    if (Unit.has(uni))
                        Unit.delete(uni);
                }
            }
        });
        return val;
    }

    function scaleReg(Unit, val) {
        Unit.forEach((v, k) => {
            let [k1, x1] = getDivPatt(k);
            if (x1 !== 0) {
                val *= Math.pow(10, x1 * v);
                if (Unit.has(k1)) {
                    let xe = Unit.get(k1);
                    v += xe;
                }
                if (v === 0)
                    Unit.delete(k1);
                else
                    Unit.set(k1, v);
                Unit.delete(k);
            }
        });
        return val;
    }

    /*
     * Verify if the unit is scaled. If so, return the un-scaled unit and the
     * 10th expoent to be applied to scale
     * @param {type} str
     * @returns {Array} [un-scaled unit, 10th exponent
     */
    function getDivPatt(str) {
        if (!(str.search(SclIdx) < 0)) {
            let rv = str.split(SclIdx);
            let dxp = Scale.get(rv[0])[1];
            return [rv[1], dxp];
        } else
            return [str, 0];
    }

    /**
     * To avoid insertion into the register X to be converted. 
     * It has to convert directelly from the combos
     */
    function convert() {
        let uUnit = untVPad();  // Retrieve new units from the combos
        let uCard = uUnit.size;
        let xCard = xUnit.size;
//        console.log(uCard, xCard);
        let valU = 1;
        let isTemp = false;
        unitCard = (uCard === 1) && (xCard === 1);
        if (unitCard) {
            let utyp = getTypUnit(uUnit);
            let xtyp = getTypUnit(xUnit);
            isTemp = (utyp === labls[2]) && (xtyp === labls[2]);
            // Temperature conversion demands special treatment
            if (isTemp) {
                valU = 0;
            }
        }
        let orvU = new Map();
        cpySetUnts(uUnit, orvU);
        cpyExpos(xUnit, uUnit);
        cpyExpos(xUnit, orvU);
        valU = scaleReg(uUnit, valU);
        valX = scaleReg(xUnit, valX);
        while (!isCoalesced(uUnit, valU)) {
            valU = coalesce(uUnit, valU);
        }
        while (!isCoalesced(xUnit, valX)) {
            valX = coalesce(xUnit, valX);
        }
        if (isTemp && unitCard) {
            valX = convTemp(orvU, valU);
            regX.value = fmtReg(valX);
            resetUnit(xUnit);
        } else {
            valX = Number(valX) / Number(valU);
            clnvars();
            regX.value = fmtReg(valX);
            uUnit.forEach((v, k) => {
                uUnit.set(k, -v);
            });
            xUnit.forEach((expo, uni) => {
                let expf;
                if (uUnit.has(uni))
                    expf = uUnit.get(uni);
                else
                    expf = 0;
                expf += expo;
                if (expf === 0)
                    uUnit.delete(uni);
                else
                    uUnit.set(uni, expf);
            });
            resetUnit(xUnit);
            cpySetUnts(uUnit, xUnit);
            clnUntInReg(xRegUnit);
            setUntsPop(xUnit, xRegUnit);
            clnvars();
            entered = true;
        }
        cpySetUnts(orvU, xUnit);
        clnUntInReg(xRegUnit);
        setUntsPop(xUnit, xRegUnit);
        clnvars();
        resetAllCtrlKeys();
    }

    function oldconvert() {
        backX = valX;
        let xCard = xUnit.size;
        let yCard = yUnit.size;
        unitCard = (xCard === 1) && (yCard === 1);
        cpySetUnts(xUnit, backXUnit);
        let xtyp = getTypUnit(xUnit);
        let ytyp = getTypUnit(yUnit);
        let isTemp = (xtyp === labls[2]) && (ytyp === labls[2]);
        // Temperature conversion demands special treatment
        if (unitCard && isTemp) {
            valX = 0;
        } else {
            valX = 1;
        }
        let orxU = new Map();
        cpySetUnts(xUnit, orxU);
        cpyExpos(yUnit, xUnit);
        cpyExpos(yUnit, orxU);
        valX = scaleReg(xUnit, valX);
        valY = scaleReg(yUnit, valY);
        while (!isCoalesced(xUnit)) {
            valX = coalesce(xUnit, valX);
        }
        while (!isCoalesced(yUnit)) {
            valY = coalesce(yUnit, valY);
        }
        if (isTemp && unitCard) {
            valX = convTemp(orxU);
            regX.value = fmtReg(valX);
            resetUnit(xUnit);
        } else
            arithOper('/');
        cpySetUnts(orxU, xUnit);
        clnUntInReg(xRegUnit);
        setUntsPop(xUnit, xRegUnit);
        clnvars();
    }

    function convTemp(U, valU) {
        //        arithOper('-');
        let rvu = 1;
        let val = valX - valU;
        U.forEach((v, i) => {
            if (v !== 0) {
                let p = i;
                if (!(i.search(SclIdx) < 0)) {
                    let ri = i.split(SclIdx);
                    p = ri[1];
                }
                let arr = theUnits.get(p);
                if (arr.length > 1) {
                    let kndd = arr[1][1];
                    rvu = kndd;
                }
            }
        });
        val /= rvu;
        return val;
    }

    function dumpSetUnit(Unit) {
        Unit.forEach((expo, uni) => {
            if (expo !== 0) {
                console.log(uni, expo);
            }
        });
    }

    function cpyExpos(U1, U2) {
        U1.forEach((expo, uni0) => {
            let aruni = uni0.split(SclIdx);
            let uni = aruni[aruni.length - 1];
            if (expo !== 0) {
                let arrU = theUnits.get(uni);
                let kind = arrU[0][1];
                let unS = uni4kind(kind, U2, 1);
                if (unS !== null) {
                    let iexp0 = U2.get(unS);
                    let rexp = expo / iexp0;
                    U2.set(unS, rexp);
                } else if (arrU.length > 1) {
                    for (let k = 1; k < arrU.length; k++) {
                        let narrU = arrU[k];
                        let darrU = narrU[0];
                        let daxp = narrU[3];
                        let arrdarr = darrU.split(SclIdx);
                        let naU = arrdarr[arrdarr.length - 1];
                        let tUn = theUnits.get(naU);
                        let tknd = tUn[0][1];
                        let tuS = uni4kind(tknd, U2, 1);
                        if (tuS !== null) {
                            let ixp = U2.get(tuS);
                            let r_ex = expo * daxp / ixp;
                            U2.set(tuS, r_ex);
                        }
                    }
                } else {
                    let arrU = theUnits.get(uni);
                    let kind = arrU[0][3];
                    let unS = uni4kind(kind, U2, 3);
                    if (unS !== null) {
                        let iexp0 = U2.get(unS);
                        let rexp = expo / iexp0;
                        U2.set(unS, rexp/Math.abs(rexp));
                    }
                }
            }
        });
    }

    function panCLEAN() {
        backX = valX;
        resetCpyUnts(xUnit, backXUnit);
        if (butmap.get('inv')) {
            resetAllPop();
        } else {
            resetPop(xUnit, xRegUnit);
            cleanUnitsConst();
        }
        recvOper();
        rvrsOpe();
        resetAllCtrlKeys();
    }
    // Click one on button "Clean"
    $("#clean").click(function () {
        backX = valX;
        resetCpyUnts(xUnit, backXUnit);
        resetPop(xUnit, xRegUnit);
        cleanUnitsConst();
        resetAllCtrlKeys();
    });
    // Click twice on button "Clean"
    $("#clean").dblclick(function () {
        backX = valX;
        resetCpyUnts(xUnit, backXUnit);
        resetAllPop();
    });
    function cleanUnitsConst() {
        labelsTot.forEach((v, i) => {
            document.getElementById(v).value = 'null';
        });
        document.getElementById('scale').value = 0;
        sclMp.clear();
    }

    // Class of numeric notations
    $(".nott").click(function () {
        actNot = getNotation();
        chgNot();
    });
    // Select over options # digits
    $("#dgts").change(function () {
        nPrecDigts = getDigits();
        chgNot();
    });
    // Put everything under the adopted number notation
    function chgNot() {
        regX.value = fmtReg(valX);
        regY.value = fmtReg(valY);
        regZ.value = fmtReg(valZ);
        regT.value = fmtReg(valT);
    }
    // Format number according to the adopted number notation
    function fmtReg(vlX) {
        switch (actNot) {
            case fixNot:
                return Number(vlX).toFixed(nPrecDigts);
            case expNot:
                return Number(vlX).toExponential(nPrecDigts);
            case engiNot:
            default:
            try {
                return Number(vlX).toPrecision(nPrecDigts);
            } catch (err) {
                alert(err.message);
                nPrecDigts = 1;
                let hdigs = document.getElementById('dgts');
                hdigs.selectedIndex = 1;
                return Number(vlX).toFixed(nPrecDigts);
            }
        }
    }
    function resetAllPop() {
        backX = valX;
        cpySetUnts(xUnit, backXUnit);
        resetPop(xUnit, xRegUnit);
        resetPop(yUnit, yRegUnit);
        resetPop(zUnit, zRegUnit);
        resetPop(tUnit, tRegUnit);
    }
    // Clean registers and else
    function cleanPile() {
        backX = valX;
        resetCpyUnts(xUnit, backXUnit);
        document.getElementById("calc").reset();
        valX = 0;
        valY = 0;
        valZ = 0;
        valT = 0;
        setRegs();
        resetAllPop();
        virgin = true;
        nPrecDigts = getDigits();
        actNot = getNotation();
        backX = valX;
        resetCpyUnts(xUnit, backXUnit);
        resetAllCtrlKeys();
    }
    $("#cce").dblclick(function () {
        cleanPile();
        resetAllCtrlKeys();
    });
    // Put on registers values from buffers
    function setRegs() {
        regX.value = fmtReg(valX);
        regY.value = fmtReg(valY);
        regZ.value = fmtReg(valZ);
        regT.value = fmtReg(valT);
    }
    // Clean up units
    function clnUntInReg(Units) {
        Units.innerHTML = "";
    }
    // reset to scratch
    function clnvars() {
        exponent = "";
        isExpo = false;
        virgin = true;
        unitCard = false;
    }
    // Clean register X
    $("#cce").click(function () {
        clnvars();
        resetPop(xUnit, xRegUnit);
        valX = 0;
        regX.value = fmtReg(valX);
        backX = valX;
        resetCpyUnts(xUnit, backXUnit);
    });

    /**
     * Change sign of register-X: 
     *                     of the number or
     *                     of the exponent if 'E' was set
     */
    function chgSign() {
        if (virgin) {
            backX = valX;
            resetCpyUnts(xUnit, backXUnit);
            valX = -valX;
            regX.value = fmtReg(valX);
        } else {
            if (isExpo)
                exponent = -1.0 * Number(exponent);
            else {
                mantissa = -1.0 * Number(mantissa);
            }
            flsX();
            if (virgin)
                regX.value = fmtReg(valX);
            else
                regX.value = valX;
        }
    }
    // change sign either of mantissa or of expo
    $("#chs").click(function () {
        chgSign();
    });
    // Enter function on the registers
    $("#enter").click(function () {
        enterF();
    });
    function enterF() {
        backX = valX;
        resetCpyUnts(xUnit, backXUnit);
        if (butmap.get('inv')) {
            valX = Number(valY);
            regX.value = fmtReg(valX);
            resetUnit(xUnit);
            cpySetUnts(yUnit, xUnit);
            clnUntInReg(xRegUnit);
            setUntsPop(xUnit, xRegUnit);
            smRollDownPile();
            recvOper();
            rvrsOpe();
        } else {
            if (virgin)
                pushUpPile();
            regX.value = fmtReg(Number(valX));
            entered = true;
            clnvars();
        }
    }
    // Clean last entered key
    $("#rbt").click(function () {
        if (!virgin) {
            if (isExpo)
                exponent = (exponent).substring(0, exponent.length - 1);
            else
                mantissa = (mantissa).substring(0, mantissa.length - 1);
            flsX();
            regX.value = valX;
        }
    });
    // Add unit and/or add to its exponent depending on 'inv' button was hit
    function addUnit2X(v) {
        if (v !== 'null') {
            let ex;
            if (xUnit.has(v))
                ex = xUnit.get(v);
            else
                ex = 0;
            if (butmap.get('inv')) {
                ex--;
            } else {
                ex++;
            }
            v = tScale + v;
            tScale = "";
            xUnit.set(v, ex);
        }
        recvOper();
    }

    function setColor2Class(Cl, Cr) {
        console.log(Cl.length);
        for (let i = 0; i < Cl.length; i++) {
            Cl[i].style.backgroundColor = Cr;
        }
    }

    function resetAllCtrlKeys() {
        let strs = ['ctl', 'alt', 'end'];
        let tabs = [untTab, scaleTab];
        strs.forEach((v, k) => {
            butmap.set(v, false);
        });
        tabs.forEach((v, k) => {
            v.style.backgroundColor = 'transparent';
        });
        setColor2Class(untTab, 'transparent');
        lablext.forEach((v, k) => {
            let cmbUns = document.getElementById(v);
            console.log(cmbUns.style.backgroundColor);
            cmbUns.style.backgroundColor = '';
        });
        setColor2Class(constTab, 'transparent');
        sclMp.clear();
    }

    document.onkeypress = function (e) {
        return false;
    };
    function findUnit(u) {
        let value = theUnits.get(u);
        let selUn = document.getElementById(value[0][3]);
        selUn.value = u;
        return selUn;
    }

    const fmtKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'S', 'E', 'F'];
    function setFmtNot(n) {
        let numFmt = fmtKeys.slice(0, 10);
        let anumFmt = fmtKeys.slice(10, 13);
        if (numFmt.includes(n)) {
            setDigits(n);
            nPrecDigts = getDigits();
            chgNot();
            resetAllCtrlKeys();
            setColor2Class(formTab, 'transparent');
            butmap.set('fmt', false);
        } else if (anumFmt.includes(n)) {
            setDigits(n.charCodeAt(0) - 55);
            nPrecDigts = getDigits();
            chgNot();
            resetAllCtrlKeys();
            setColor2Class(formTab, 'transparent');
            butmap.set('fmt', false);
        } else {
            setNotation(NotMap.get(n));
            actNot = getNotation();
            nPrecDigts = getDigits();
            chgNot();
            resetAllCtrlKeys();
            setColor2Class(formTab, 'transparent');
            butmap.set('fmt', false);
        }

    }

    function SclsNUnts(v) {
        let un2sc = findUnit(v);
        if (butmap.get('inv')) {
            invmap.push(v);
            butmap.set('inv', false);
            un2sc.style.backgroundColor = altrnShftClr;
        }
        if (lstScl !== 'none') {
            sclMp.set(v, lstScl);
            //                        sclSel.selectedIndex = 0;
            lstScl = 'none';
            let arrUn2sc = theUnits.get(v);
            //                        console.log(arrUn2sc[0][3]);
            let Un2sc = arrUn2sc[0][3];
            let un2sc = document.getElementById(Un2sc);
            un2sc.style.backgroundColor = sclHShftClr;
        }
        if ((invmap.length > 0) && (sclMp.size > 0))
            un2sc.style.backgroundColor = sclNaltClr;

    }

    document.onkeyup = function (e) {
        if (e.key === '\\') {
            setSHFT(document.getElementById('inv')); // Manage back color and hash butmap
        } else if (butmap.get('ctl')) {    // Unit definition is active
            if (ctrlKeys.has(e.key)) {
                let v = ctrlKeys.get(e.key);
                SclsNUnts(v);
                /*
                 let un2sc = findUnit(v);
                 if (butmap.get('inv')) {
                 invmap.push(v);
                 butmap.set('inv', false);
                 un2sc.style.backgroundColor = altrnShftClr;
                 }
                 if (lstScl !== 'none') {
                 sclMp.set(v, lstScl);
                 //                        sclSel.selectedIndex = 0;
                 lstScl = 'none';
                 let arrUn2sc = theUnits.get(e.key);
                 //                        console.log(arrUn2sc[0][3]);
                 let Un2sc = arrUn2sc[0][3];
                 let un2sc = document.getElementById(Un2sc);
                 un2sc.style.backgroundColor = sclHShftClr;
                 }
                 if ((invmap.length > 0) && (sclMp.size > 0))
                 un2sc.style.backgroundColor = sclNaltClr;
                 */
            }
            untTab.style.backgroundColor = 'transparent'; // reset back color
            butmap.set('ctl', false); // reset butmap state for unit definition
            resetButtonColor(); // reset button to its color
            virgin = false;
            entered = true;
            invOpe(0);
            //            rvrsFOpe();
        } else if (butmap.get('alt')) {   // otherwise the constant definition is active
            if (altKeys.has(e.key)) {
                let v = altKeys.get(e.key);
                let mapC = new Map();
                if (v[1] === "physical")
                    mapC = physConst;
                else if (v[1] === "astron")
                    mapC = astrConst;
                else
                    mapC = null;
                getConsts(v[0], mapC);
            }
            setColor2Class(constTab, 'transparent');
            //                constTab.style.backgroundColor = 'transparent';
            butmap.set('alt', false);
            rvrsOpe();
        } else if (butmap.get('end')) {
            if (scaleKeys.has(e.key)) {
                lstScl = e.key;
                tScale = scaleKeys.get(e.key) + ",";
                let thsScl = Scale.get(e.key);
                let selscl = document.getElementById('scale');
                selscl.value = thsScl[1];
            }
            scaleTab.style.backgroundColor = 'transparent';
            butmap.set('end', false);
        } else if (butmap.get('fmt')) {
            if (fmtKeys.includes(e.key)) {
                setFmtNot(e.key);
            } else {
                butmap.set('fmt', false);
                setColor2Class(formTab, 'transparent');
            }
        } else {
            switch (e.key) {
                case 'PageDown':
                    if (butmap.get('ctl')) {
                        untTab.style.backgroundColor = 'transparent';
                        butmap.set('ctl', false);
                        butmap.set('inv', false);
                        butmap.set('end', false);
                        sclMp.clear();
                    } else {
                        if (butmap.get('alt')) {
                            setColor2Class(constTab, 'transparent');
                            //                            constTab.style.backgroundColor = 'transparent';
                            butmap.set('alt', false);
                            butmap.set('inv', false);
                            butmap.set('end', false);
                            sclMp.clear();
                        }
                        untTab.style.backgroundColor = '#5fa3c7';
                        butmap.set('ctl', true);
                    }
                    break;
                case 'PageUp':
                    if (butmap.get('alt')) {
                        setColor2Class(constTab, 'transparent');
                        //                        constTab.style.backgroundColor = 'transparent';
                        butmap.set('alt', false);
                        butmap.set('inv', false);
                    } else {
                        if (butmap.get('ctl')) {
                            untTab.style.backgroundColor = 'transparent';
                            butmap.set('ctl', false);
                            butmap.set('inv', false);
                        }
                        setColor2Class(constTab, '#F98F62');
                        //                        constTab.style.backgroundColor = '#F98F62';
                        butmap.set('alt', true);
                    }
                    break;
                case 'End':
                    if (butmap.get('end')) {
                        scaleTab.style.backgroundColor = 'transparent';
                        butmap.set('end', false);
                    } else {
                        butmap.set('end', true);
                        scaleTab.style.backgroundColor = sclHShftClr;
                        setColor2Class(constTab, 'transparent');
                        untTab.style.backgroundColor = 'transparent';
                        //                                                butmap.set('inv', false);
                        butmap.set('ctl', false);
                        butmap.set('alt', false);
                    }
                    break;
                case 'f':
                    if (butmap.get('fmt')) {
                        resetAllCtrlKeys();
                        setColor2Class(formTab, 'transparent');
                        butmap.set('fmt', false);
                    } else {
                        butmap.set('fmt', true);
                        setColor2Class(formTab, '#4eb622');
                    }
                    break;
                case 'Home':
                    coalsconv();
                    break;
                case 'ArrowDown':
                    rollDownPile();
                    virgin = true;
                    entered = false;
                    break;
                case 'ArrowUp':
                    rollUpPile();
                    virgin = true;
                    entered = false;
                    break;
                case 'Delete':
                    if (butmap.get('inv')) {
                        cleanPile();
                        recvOper();
                        rvrsOpe();
                    } else {
                        clnvars();
                        resetPop(xUnit, xRegUnit);
                        valX = 0;
                        regX.value = fmtReg(valX);
                        backX = valX;
                        resetCpyUnts(xUnit, backXUnit);
                    }
                    break;
                case 'e':
                    if (!virgin)
                        set2expo();
                    regX.value = valX;
                    break;
                case 'P':
                    setPI();
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                case '.':
                case ':':
                    inNumKey(e.key);
                    break;
                case 'Backspace':
                    mantissa = regX.value.substr(0, regX.value.length - 1);
                    exponent = "";
                    isExpo = false;
                    flsX();
                    regX.value = valX;
                    break;
                case 'Enter':  // Enter key
                    enterF();
                    break;
                    // '+'
                case '+':  // key plus
                    if (unitAllows())
                        ariTested('+');
                    break;
                    // '-'
                case '-':  // key minus
                    if (unitAllows() || adimensional(xUnit))
                        ariTested('-');
                    break;
                    // '*'
                case '*':  // key mult
                    ariTested('*');
                    break;
                    // '/'
                case '/':  // key div
                    ariTested('/');
                    break;
                case '_':
                    chgSign();
                    break;
                case 'b':
                    panABS();
                    break;
                case 'q':
                    panSQR();
                    break;
                case '<':
                    panINVX();
                    break;
                case '%':
                    panPERC();
                    break;
                case 'ArrowLeft':
                    panXY();
                    break;
                case 'p':
                    panToPolar();
                    break;
                case '^':
                    panY2X();
                    break;
                case ';':
                    panDMS();
                    break;
                case 'i':
                    panINT();
                    break;
                case 'X':
                    panLOG10();
                    break;
                case 'Q':
                    if (butmap.get('inv')) {
                        panAtan2();
                    } else
                        panQUADR();
                    break;
                case 'x':
                    panEXP();
                    break;
                case 'S':
                    panSNH();
                    break;
                case 'C':
                    panCSH();
                    break;
                case 'T':
                    panTNH();
                    break;
                case 'j':
                    panJUL();
                    break;
                case 'm':
                    tggkey(stobut);
                    break;
                case 'r':
                    tggkey(rclbut);
                    break;
                case 'n':
                    panRND();
                    break;
                case 'Insert':
                    panCLEAN();
                    break;
                case 's':
                case 'c':
                case 't':
                    if (butmap.get('inv')) {
                        if (adimensional(xUnit)) {
                            if (e.key === "s")
                                operatX(Math.asin(Number(valX)));
                            else if (e.key === "c")
                                operatX(Math.acos(Number(valX)));
                            else if (e.key === "t")
                                operatX(Math.atan(Number(valX)));
                            xUnit.set('rad', 1);
                            setUntsPop(xUnit, xRegUnit);
                        }
                    } else {
                        let roper = unitAngle(xUnit);
                        if (roper[0]) {
                            if (e.key === "s")
                                operatX(Math.sin(roper[1]));
                            else if (e.key === "c")
                                operatX(Math.cos(roper[1]));
                            else if (e.key === "t")
                                operatX(Math.tan(roper[1]));
                            resetPop(xUnit, xRegUnit);
                        }
                    }
                    rvrsOpe();
                    recvOper();
                    break;
                case '!':
                    panFact();
                    break;
                case 'K':
                    panKepler();
                    break;
                case 'k':
                    convert();
                    break;
                case '@':
                    if (butmap.get('inv'))
                        panTriangles('EqH');
                    else
                        panTriangles('HEq');
                    break;
                case '#':
                    if (butmap.get('inv'))
                        panTriangles('EEc');
                    else
                        panTriangles('EcE');
                    break;
                case '$':
                    if (butmap.get('inv'))
                        panTriangles('EGa');
                    else
                        panTriangles('GaE');
                    break;
                case 'u':
                case 'U':
                    untXPad();
                    resetAllCtrlKeys();
                    break;
                case 'w':
                    GST0UT();
                default:
            }
        }
        //        cleanUnitsConst();
        // Do nothing after on
        return false;
    };
    // Verify if units are compatible to arithmetic operations
    function unitAllows() {
        let rv = true;
        xUnit.forEach((expo0, uni) => {
            rv &= yUnit.has(uni);
            if (rv) {
                let expo1 = yUnit.get(uni);
                rv &= (expo0 === expo1);
            }
        });
        yUnit.forEach((expo0, uni) => {
            rv &= xUnit.has(uni);
            if (rv) {
                let expo1 = xUnit.get(uni);
                rv &= (expo0 === expo1);
            }
        });
        return rv;
    }

    function mergeUnits(k) {
        yUnit.forEach((expo, uni) => {
            let expf;
            if (xUnit.has(uni))
                expf = xUnit.get(uni);
            else
                expf = 0;
            if (k === '*')
                expf += expo;
            else
                expf -= expo;
            if (expf === 0)
                xUnit.delete(uni);
            else
                xUnit.set(uni, expf);
        });
        clnUntInReg(xRegUnit);
        setUntsPop(xUnit, xRegUnit);
    }

    /**
     * Put color on button [inv]
     * @param {Color} V
     * @returns 
     */
    function setSHFT(V) {
        if (butmap.get('inv')) {
            butmap.set('inv', false);
            V.style.backgroundColor = defltShftClr;
            invOpe(0);
        } else {
            butmap.set('inv', true);
            V.style.backgroundColor = altrnShftClr;
            invOpe(1);
        }
    }
    $("#inv").click(function () {
        setSHFT(this);
    });
    $("#inv").hover(function () {
        if (butmap.get('inv')) {
            this.style.backgroundColor = altrHShftClr;
        } else {
            this.style.backgroundColor = hoverShftClr;
        }
    }, function () {
        if (butmap.get('inv')) {
            this.style.backgroundColor = altrnShftClr;
        } else {
            this.style.backgroundColor = defltShftClr;
        }
    });
    // Spectial for buttons "sto" and "rcl"
    function tgglctl1(but) {
        const ibut = document.getElementById(but);
        ibut.style.backgroundColor = 'white';
        ibut.addEventListener('click', function onClick(event) {
            const backgroundcolor = ibut.style.backgroundColor;
            if (backgroundcolor === 'white') {
                ibut.style.backgroundColor = 'grey';
                butmap.set(but, true);
            } else {
                ibut.style.backgroundColor = 'white';
                butmap.set(but, false);
            }
        });
        return ibut;
    }

    // Supposed to serve when hitting 'm'
    function tggkey(ibut) {
        const backgroundcolor = ibut.style.backgroundColor;
        if (backgroundcolor === 'white') {
            ibut.style.backgroundColor = 'grey';
            if (ibut === stobut)
                butmap.set('sto', true);
            else
                butmap.set('rcl', true);
        } else {
            ibut.style.backgroundColor = 'white';
            if (ibut === stobut)
                butmap.set('sto', false);
            else
                butmap.set('rcl', false);
        }
    }

    // Toggle registers for the buttons with alternative functions
    function invOpe(i) {
        fkeys.forEach(function (v, k) {
            let vbut = document.getElementById(k);
            vbut.value = v[i][0];
            vbut.title = v[i][1];
        });
    }
    // Put a number in registry X
    function putX() {
        flsX();
        regX.value = fmtReg(valX);
    }
    // Flush a number to the registry X without formating it
    function flsX() {
        let Xvalue = mantissa;
        if (isExpo)
            Xvalue += "E" + exponent;
        valX = Xvalue;
        //        regX.value = valX;
    }
    // Pressed button of class '.num'
    $(".num").click(function () {
        var x = document.getElementById($(this).attr('id'));
        inNumKey(x.value);
        recvOper();
        invOpe(0);
        cleanUnitsConst();
    });
    // The num key is pressed put it either on registry X or store X in the numbered memory
    function inNumKey(x) {
        if (butmap.get("sto")) {
            backX = valX;
            resetCpyUnts(xUnit, backXUnit);
            memreg[Number(x)] = valX;
            resetUnit(UnMemR[Number(x)]);
            cpySetUnts(xUnit, UnMemR[Number(x)]);
            regX.value = fmtReg(valX);
            virgin = true;
            butmap.set('sto', false);
            stobut.style.backgroundColor = 'white';
            entered = true;
        } else if (butmap.get("rcl")) {
            pushUpPile();
            valX = memreg[Number(x)];
            regX.value = fmtReg(valX);
            resetPop(xUnit, xRegUnit);
            cpySetUnts(UnMemR[Number(x)], xUnit);
            setUntsPop(xUnit, xRegUnit);
            virgin = true;
            butmap.set('rcl', false);
            rclbut.style.backgroundColor = 'white';
            entered = true;
        } else {
            if (virgin) {
                pushUpPile();
                resetPop(xUnit, xRegUnit);
                if (entered) {
                    flsX();
                    entered = false;
                }
                mantissa = x;
                flsX();
                regX.value = valX;
                virgin = false;
            } else {
                if (isExpo)
                    exponent += x;
                else
                    mantissa += x;
                //                putX(regX.value.concat(x.value));
                flsX();
                regX.value = valX;
            }
        }
    }
    // Button "expo", same as key "E"
    $("#eex").click(function () {
        if (!virgin)
            set2expo();
        regX.value = valX;
    });
    function set2expo() {
        isExpo ^= true;
        flsX();
    }
    // Button Roll down
    $("#rlldn").click(function () {
        if (butmap.get('inv')) {
            rollUpPile();
            recvOper();
            rvrsOpe();
        } else {
            rollDownPile();
            virgin = true;
            entered = false;
        }
    });
    // Button "1/x"
    function panINVX() {
        backX = valX;
        resetCpyUnts(xUnit, backXUnit);
        valX = 1.0 / Number(valX);
        mantissa = valX;
        exponent = "";
        isExpo = false;
        putX();
        clnvars();
        invXUnits();
    }
    $("#invx").click(function () {
        panINVX();
    });
    function invXUnits() {
        xUnit.forEach((vexp, kval) => {
            if (vexp !== 0) {
                xUnit.set(kval, -vexp);
            }
        });
        clnUntInReg(xRegUnit);
        setUntsPop(xUnit, xRegUnit);
    }
    // Button of arithmetic class
    $(".ari").click(function () {
        var k = document.getElementById($(this).attr('id'));
        ariTested(k.value);
    });
    function ariTested(k) {
        if (((k === '*') || (k === '/')) || unitAllows())
            arithOper(k);
        rvrsOpe();
        recvOper();
    }
    function arithOper(op) {
        backX = valX;
        resetCpyUnts(xUnit, backXUnit);
        valX = arithmetic(op);
        regX.value = fmtReg(valX);
        if ((op === '*') || (op === '/')) {
            let sgn = (op === '*') ? +1 : -1;
            xUnit.forEach((v, k) => {
                xUnit.set(k, sgn * v);
            });
            mergeUnits('*');
        }
        clnUntInReg(xRegUnit);
        setUntsPop(xUnit, xRegUnit);
        smRollDownPile();
        clnvars();
        entered = true;
    }
    // Verify if the two sets are formed by the same units
    function sameUnits(Unt1, Unt2) {
        let xMinU = new Map();
        let yMinU = new Map();
        Unt1.forEach((expo, uni) => {
            if (expo !== 0)
                xMinU.set(uni, expo);
        });
        Unt2.forEach((expo, uni) => {
            if (expo !== 0)
                yMinU.set(uni, expo);
        });
        let rv = xMinU.size === yMinU.size;
        if (rv) {
            xMinU.forEach((expo, uni) => {
                rv &= yMinU.has(uni);
                if (rv)
                    rv &= (yMinU.get(uni) === expo);
            });
        }
        return rv;
    }

    // Button %
    function panPERC() {
        backX = valX;
        resetCpyUnts(xUnit, backXUnit);
        if (adimensional(xUnit) || sameUnits(xUnit, yUnit))
            if (butmap.get('inv')) {
                let sval = valY;
                arithOper('-');
                valX /= sval;
                valX *= -100;
                regX.value = fmtReg(valX);
                resetPop(xUnit, xRegUnit);
                recvOper();
            } else {
                let backY = valY;
                resetCpyUnts(xUnit, backXUnit);
                mantissa = arithmetic("*") / 100;
                exponent = "";
                isExpo = false;
                putX();
                mergeUnits("*");
                //        smRollDownPile();
                regY.value = fmtReg(backY);
                clnvars();
            }
        rvrsFOpe();
    }
    $("#perc").click(function () {
        panPERC();
    });
    // Button "x-y", swap x and y
    function panXY() {
        if (butmap.get('inv')) {
            pushUpPile();
            valX = backX;
            regX.value = fmtReg(valX);
            entered = true;
            clnvars();
            resetPop(xUnit, xRegUnit);
            cpySetUnts(backXUnit, xUnit);
            setUntsPop(xUnit, xRegUnit);
            recvOper();
            rvrsOpe();
        } else {
            chngeXY();
        }
    }
    $("#xy").click(function () {
        panXY();
    });
    function chngeXY() {
        let s = valX;
        valX = valY;
        valY = s;
        regX.value = fmtReg(valX);
        regY.value = fmtReg(valY);
        cpySetUnts(xUnit, swapMap);
        resetUnit(xUnit);
        cpySetUnts(yUnit, xUnit);
        resetUnit(yUnit);
        cpySetUnts(swapMap, yUnit);
        clnUntInReg(yRegUnit);
        setUntsPop(yUnit, yRegUnit);
        clnUntInReg(xRegUnit);
        setUntsPop(xUnit, xRegUnit);
        mantissa = "";
        exponent = "";
        virgin = true;
        entered = false;
        resetUnit(swapMap);
    }
    // Roll up (one of the "enter" functions)
    function pushUpPile() {
        // Transfer Z-value and unit to T's
        valT = valZ;
        regT.value = fmtReg(valT);
        resetPop(tUnit, tRegUnit);
        cpySetUnts(zUnit, tUnit);
        setUntsPop(tUnit, tRegUnit);
        // Transfer Y-value and unit to Z's
        valZ = valY;
        regZ.value = fmtReg(valZ);
        resetPop(zUnit, zRegUnit);
        cpySetUnts(yUnit, zUnit);
        setUntsPop(zUnit, zRegUnit);
        // Transfer X-value and unit to Y's
        valY = valX;
        regY.value = fmtReg(valY);
        resetPop(yUnit, yRegUnit);
        cpySetUnts(xUnit, yUnit);
        setUntsPop(yUnit, yRegUnit);
        isExpo = false;
    }
    // Roll down
    function rollDownPile() {
        //Save X-value and Unit into buffers
        let sUnit = new Map();
        let s = valX;
        cpySetUnts(xUnit, sUnit);
        // Transfer Y-value and Unit into X's
        valX = valY;
        regX.value = fmtReg(valX);
        resetPop(xUnit, xRegUnit);
        cpySetUnts(yUnit, xUnit);
        setUntsPop(xUnit, xRegUnit);
        // Transfer Z-value and Unit into Y's
        valY = valZ;
        regY.value = fmtReg(valY);
        resetPop(yUnit, yRegUnit);
        cpySetUnts(zUnit, yUnit);
        setUntsPop(yUnit, yRegUnit);
        // Transfer T-value and Unit into Z's
        valZ = valT;
        regZ.value = fmtReg(valZ);
        resetPop(zUnit, zRegUnit);
        cpySetUnts(tUnit, zUnit);
        setUntsPop(zUnit, zRegUnit);
        // Transfer buffer value and Unit into T's
        valT = s;
        regT.value = fmtReg(valT);
        resetPop(tUnit, tRegUnit);
        cpySetUnts(sUnit, tUnit);
        setUntsPop(tUnit, tRegUnit);
    }
    // Partial roll down
    function smRollDownPile() {
        // Transfer Z-value and Unit into Y's
        valY = valZ;
        regY.value = fmtReg(valY);
        resetPop(yUnit, yRegUnit);
        cpySetUnts(zUnit, yUnit);
        setUntsPop(yUnit, yRegUnit);
        // Transfer T-value and Unit into Z's
        valZ = valT;
        regZ.value = fmtReg(valZ);
        resetPop(zUnit, zRegUnit);
        cpySetUnts(tUnit, zUnit);
        setUntsPop(zUnit, zRegUnit);
        isExpo = false;
    }
    // Roll up
    function rollUpPile() {
        let sUnit = new Map();
        let s = valT;
        cpySetUnts(tUnit, sUnit);
        // Transfer Z-value and unit to T's
        valT = valZ;
        regT.value = fmtReg(valT);
        resetPop(tUnit, tRegUnit);
        cpySetUnts(zUnit, tUnit);
        setUntsPop(tUnit, tRegUnit);
        // Transfer Y-value and unit to Z's
        valZ = valY;
        regZ.value = fmtReg(valZ);
        resetPop(zUnit, zRegUnit);
        cpySetUnts(yUnit, zUnit);
        setUntsPop(zUnit, zRegUnit);
        // Transfer X-Value and unit to Y's
        valY = valX;
        regY.value = fmtReg(valY);
        resetPop(yUnit, yRegUnit);
        cpySetUnts(xUnit, yUnit);
        setUntsPop(yUnit, yRegUnit);
        // Transfer buffer value and unit to X's
        valX = s;
        regX.value = fmtReg(valX);
        resetPop(xUnit, xRegUnit);
        cpySetUnts(sUnit, xUnit);
        setUntsPop(xUnit, xRegUnit);
        entered = true;
    }
    // Arithmetic operations on x and y
    function arithmetic(oper) {
        var x = Number(valX);
        var y = Number(valY);
        let rv = 0;
        switch (oper) {
            case '+':
                rv = y + x;
                break;
            case '-':
                rv = y - x;
                break;
            case '*':
                rv = y * x;
                break;
            case '/':
                if (x === 0) {
                    alert("Division by zero");
                    rv = x;
                } else
                    rv = y / x;
                break;
            default:
                alert("Operation signal not known: " + oper);
        }
        clnvars();
        return rv;
    }

    // Get angle unit
    function unitAngle(Unit) {
        valX = coalesce(xUnit, valX);
        return whatUniqUnit(Unit, 'rad');
    }

    function whatUniqUnit(Unit, uniA) {
        let rv = false;
        //        valX = coalesce(xUnit, valX);
        let cnt = 0;
        Unit.forEach(((expo, uni) => {
            if (expo === 1) {
                cnt++;
                rv = ((uni === uniA) && (cnt === 1));
            }
        }));
        return [rv, valX];
    }

    function unitIsDegHR(Unit) {
        let rv = false;
        let cnt = 0;
        Unit.forEach((expo, uni) => {
            if (expo === 1) {
                cnt++;
                for (let dg of ['deg', 'min', 'sec', 'grd', 'hour', 'hmin', 'hsec']) {
                    rv |= true;
                }
            }
        });
        return rv && (cnt === 1);
    }
    // Auxiliary function to finish functions opearating on X
    function operatX(xvar) {
        mantissa = xvar;
        exponent = "";
        isExpo = false;
        putX();
        virgin = false;
        recvOper();
    }

    // Transform to polar coordinates
    function panToPolar() {
        backX = valX;
        resetCpyUnts(xUnit, backXUnit);
        if (butmap.get('inv')) {
            if (kindOfUnit(yUnit, labls[7])) {
                let R = coalesce(xUnit, valX);
                let theta = coalesce(yUnit, valY);
                valX = R * Math.cos(theta);
                valY = R * Math.sin(theta);
                regY.value = fmtReg(valY);
                resetPop(yUnit, yRegUnit);
                cpySetUnts(xUnit, yUnit);
                setUntsPop(yUnit, yRegUnit);
                regX.value = fmtReg(valX);
            }

        } else {
            if (sameUnits(xUnit, yUnit)) {    // Do it only if the two registers have the same kind of units
                valX = coalesce(xUnit, valX);
                valY = coalesce(yUnit, valY);
                let y = valY;
                let x = valX;
                let R = Math.sqrt(x * x + y * y);
                let theta = Math.atan2(y, x);
                valY = theta;
                regY.value = fmtReg(valY);
                resetPop(yUnit, yRegUnit);
                yUnit.set('rad', 1);
                setUntsPop(yUnit, yRegUnit);
                valX = R;
                regX.value = fmtReg(valX);
                //                    resetPop(xUnit, xRegUnit);
                clnUntInReg(xRegUnit);
                setUntsPop(xUnit, xRegUnit);
            }
        }
        recvOper();
        rvrsOpe();
        clnvars();
    }
    $("#toPolar").click(function () {
        panToPolar();
    });
    function resetButtonColor() {
        let invbut = document.getElementById('inv');
        invbut.style.backgroundColor = defltShftClr;
    }
    // Toggle "INV" button to false
    function recvOper() {
        butmap.set('inv', false);
        let invbut = document.getElementById('inv');
        invbut.style.backgroundColor = defltShftClr;
        //        ("#abs").value = "ABS";
    }
    function setPI() {
        backX = valX;
        resetCpyUnts(xUnit, backXUnit);
        pushUpPile();
        valX = Math.PI;
        if (butmap.get('inv')) {
            valX /= 2;
            recvOper();
        }
        regX.value = fmtReg(valX);
        resetPop(xUnit, xRegUnit);
        cleanUnitsConst();
        rvrsFOpe();
    }
    $("#pi").click(function () {
        setPI();
    });
    function panRND() {
        backX = valX;
        resetCpyUnts(xUnit, backXUnit);
        pushUpPile();
        operatX(Math.random());
        resetPop(xUnit, xRegUnit);
        cleanUnitsConst();
        rvrsOpe();
    }
    // Generate a random number [0,1]
    $("#rnd").click(function () {
        panRND();
    });
    function panABS() {
        backX = valX;
        resetCpyUnts(xUnit, backXUnit);
        if (butmap.get('inv')) {
            operatX(-Math.abs(Number(valX)));
        } else {
            operatX(Math.abs(Number(valX)));
        }
        rvrsOpe();
    }
    $("#abs").click(function () {
        panABS();
    });
    function panSQR() {
        backX = valX;
        resetCpyUnts(xUnit, backXUnit);
        if (butmap.get('inv')) {
            operatX(Math.sqrt(Number(valX)));
            operOnExpo(xUnit, 0.5);
        } else {
            operatX(Math.pow(Number(valX), 2));
            operOnExpo(xUnit, 2);
        }
        rvrsOpe();
        clnUntInReg(xRegUnit);
        setUntsPop(xUnit, xRegUnit);
    }
    $("#sqr").click(function () {
        panSQR();
    });
    // Apply power operation on the units
    function operOnExpo(Unit, nidx) {
        backX = valX;
        resetCpyUnts(xUnit, backXUnit);
        Unit.forEach((vexp, kval) => {
            if (vexp !== 0) {
                vexp *= nidx;
                Unit.set(kval, vexp);
            }
        });
    }
    // Verify if register is adimensional
    function adimensional(Unt) {
        let rv = true;
        Unt.forEach((vex, kv) => {
            rv &= (vex === 0);
        });
        return rv;
    }

    // UNITS

    /*
     * Figure out what unit's kind index in the registered unit
     * @param {type} knd
     * @param {type} Unit
     * @returns {i}
     */
    function uni4kind(knd, Unit, tp) {
        let rvu = null;
        Unit.forEach((v, i) => {
            if (v !== 0) {
                let p = i;
                if (!(i.search(SclIdx) < 0)) {
                    let ri = i.split(SclIdx);
                    p = ri[1];
                }
                let arr = theUnits.get(p);
                let kndd = arr[0][tp];
                if (kndd === knd) {
                    rvu = i;
                }
            }
        });
        return rvu;
    }

    /*
     * Get type of the Unit (should be unitary)
     * @param {type} Unit
     * @returns type in array labls
     */
    function getTypUnit(Unit) {
        let rvu = null;
        Unit.forEach((v, i) => {
            if (v !== 0) {
                let p = i;
                if (!(i.search(SclIdx) < 0)) {
                    let ri = i.split(SclIdx);
                    p = ri[1];
                }
                let arr = theUnits.get(p);
                let kndd = arr[0][1];
                rvu = kndd;
            }
        });
        return rvu;
    }


    // See if the Unit register is uniq and of type 'knd'
    function kindOfUnit(Unt, knd) {
        let unts = kindsOfUnit(Unt);
        let rv = unts.size === 1;
        unts.forEach((v, m) => {
            rv &= knd === m;
            rv &= v === 1;
        });
        return rv;
    }
    // Verify if given unit set is uniquely of the given unit
    function isOfUnit(Unt, un) {
        let rv = false;
        Unt.forEach((vex, kv) => {
            rv |= ((vex !== 0) && (kv === un));
        });
        return rv;
    }

    /*
     * The units types of a unit register
     * @param {type} Unit
     * @returns {Map}
     */
    function kindsOfUnit(Unit) {
        let rv = new Map();
        Unit.forEach((v, i) => {
            if (v !== 0) {
                let arrV = theUnits.get(i);
                rv.set(arrV[0][1], v);
            }
        });
        return rv;
    }

    //Test if the two unit registers have the same units with the same exponents
    function sameUnits(Unt1, Unt2) {
        valX = scaleReg(xUnit, valX);
        let kdsX = kindsOfUnit(xUnit);
        valY = scaleReg(yUnit, valY);
        let kdsY = kindsOfUnit(yUnit);
        let rv = (kdsX.size === kdsY.size);
        if (rv) {
            kdsX.forEach((x, k) => {
                rv &= kdsY.has(k);
                if (rv)
                    rv &= (x === kdsY.get(k));
            });
        }
        return rv;
    }

    /////////////////////////////////////////////////////////////////

    function x2y() {
        if (adimensional(yUnit)) {
            operOnExpo(xUnit, Number(valY));
            operatX(Math.pow(Number(valX), Number(valY)));
            smRollDownPile();
            rvrsOpe();
            clnUntInReg(xRegUnit);
            setUntsPop(xUnit, xRegUnit);
        } else
            alert("Value should be adimensional");
    }
    // Y to power X
    function panY2X() {
        backX = valX;
        resetCpyUnts(xUnit, backXUnit);
        if (butmap.get('inv')) {
            x2y();
        } else {
            chngeXY();
            x2y();
        }
    }
    $("#y2x").click(function () {
        panY2X();
    });
    function tdms(X) {
        let sgn = Math.abs(X) / X;
        X = Math.abs(X);
        let DD = Number(intVal(X, false)).toFixed(0);
        let M = intVal(X, true) * 60;
        let MM = Math.abs(Math.trunc(M));
        let S = Math.abs(intVal(M, true) * 60);
        let rv = Number(DD).toString() + ":" + Number(MM).toFixed(0).toString() + ":" + fmtReg(S);
        if (sgn < 0)
            rv = "-" + rv;
        return rv;
    }
    function tddd(X) {
        let sgn = 1;
        if (X.includes("-")) {
            sgn *= -1;
        }
        let splX = X.split(':');
        let d = Number(splX[0]);
        if (splX.length > 1)
            d += sgn * Number(splX[1]) / 60;
        if (splX.length > 2)
            d += sgn * Number(splX[2]) / 3600;
        return d;
    }
    // Format DD:MM:SS
    function panDMS() {
        if (unitIsDegHR(xUnit)) {
            if (butmap.get('inv')) {
                mantissa = tddd(regX.value);
                exponent = "";
                putX();
            } else {
                regX.value = tdms(valX);
            }
        }
        rvrsOpe();
        recvOper();
    }
    $("#dms").click(function () {
        panDMS();
    });
    function intVal(X, dir) {
        if (X !== 0) {
            let abX = Math.abs(X);
            let sgX = X / abX;
            let flr = Math.floor(Number(abX));
            if (dir)
                abX -= flr;
            else
                abX = flr;
            return sgX * abX;
        } else
            return 0;
    }
    function panINT() {
        operatX(intVal(valX, butmap.get('inv')));
        rvrsOpe();
    }
    // Integer of a real number
    $("#int").click(function () {
        panINT();
    });
    function panLOG10() {
        backX = valX;
        resetCpyUnts(xUnit, backXUnit);
        if (adimensional(xUnit)) {
            if (butmap.get('inv'))
                operatX(Math.log10(Number(valX)));
            else
                operatX(Math.pow(10., Number(valX)));
            rvrsOpe();
        } else
            alert("Value should be adimensional");
    }
    // Actually it is 10^X
    $("#log10").click(function () {
        panLOG10();
    });
    // Reduce to the quadrant 2PI
    function panQUADR() {
        backX = valX;
        resetCpyUnts(xUnit, backXUnit);
        if (kindOfUnit(xUnit, labls[7])) {
            valX = coalesce(xUnit, valX);
            valX = 2 * Math.PI * intVal(valX / 2 / Math.PI, true);
            if (valX < 0)
                valX += 2 * Math.PI;
            regX.value = fmtReg(valX);
            resetPop(xUnit, xRegUnit);
            xUnit.set('rad', 1);
            setUntsPop(xUnit, xRegUnit);
            recvOper();
            rvrsOpe();
        }
    }
    $("#quadr").click(function () {
        if (butmap.get('inv')) {
            panAtan2();
        } else
            panQUADR();
    });
    function panAtan2() {
        if (sameUnits(xUnit, yUnit)) {
            backX = valX;
            resetCpyUnts(xUnit, backXUnit);
            valX = Math.atan2(valY, valX);
            regX.value = fmtReg(valX);
            smRollDownPile();
            resetPop(xUnit, xRegUnit);
            xUnit.set('rad', 1);
            setUntsPop(xUnit, xRegUnit);
            recvOper();
            rvrsOpe();
        }
    }
    // One of the trigonometric buttons
    $(".trig").click(function () {
        if (butmap.get('inv')) {
            if (adimensional(xUnit)) {
                if (this.value === "ASIN")
                    operatX(Math.asin(Number(valX)));
                else if (this.value === "ACOS")
                    operatX(Math.acos(Number(valX)));
                else if (this.value === "ATAN")
                    operatX(Math.atan(Number(valX)));
                xUnit.set('rad', 1);
                setUntsPop(xUnit, xRegUnit);
            }
        } else {
            let roper = unitAngle(xUnit);
            if (roper[0]) {
                if (this.value === "SIN")
                    operatX(Math.sin(roper[1]));
                else if (this.value === "COS")
                    operatX(Math.cos(roper[1]));
                else if (this.value === "TAN")
                    operatX(Math.tan(roper[1]));
                resetPop(xUnit, xRegUnit);
            }
        }
        rvrsOpe();
    });
    // Exponential function of X
    function panEXP() {
        if (adimensional(xUnit)) {
            backX = valX;
            resetCpyUnts(xUnit, backXUnit);
            if (butmap.get('inv'))
                operatX(Math.log(Number(valX)));
            else
                operatX(Math.exp(Number(valX)));
            rvrsOpe();
        } else
            alert("Value should be adimensional");
    }
    $("#exp").click(function () {
        panEXP();
    });
    function panSNH() {
        if (adimensional(xUnit)) {
            backX = valX;
            resetCpyUnts(xUnit, backXUnit);
            if (butmap.get('inv'))
                operatX(Math.sinh(Number(valX)));
            else
                operatX(Math.asinh(Number(valX)));
            rvrsOpe();
        }
    }
    // Hyperbolic sine
    $("#snh").click(function () {
        panSNH();
    });
    function panCSH() {
        if (adimensional(xUnit)) {
            backX = valX;
            resetCpyUnts(xUnit, backXUnit);
            if (butmap.get('inv'))
                operatX(Math.cosh(Number(valX)));
            else
                operatX(Math.acosh(Number(valX)));
            rvrsOpe();
        }
    }
    // Hyperbolic cosine
    $("#csh").click(function () {
        panCSH();
    });
    function panTNH() {
        if (adimensional(xUnit)) {
            backX = valX;
            resetCpyUnts(xUnit, backXUnit);
            if (butmap.get('inv'))
                operatX(Math.tanh(Number(valX)));
            else
                operatX(Math.atanh(Number(valX)));
            rvrsOpe();
        }
    }
    // Hyperbolic tangent
    $("#tnh").click(function () {
        panTNH();
    });
    /*
     * Evaluate Julian day from the Gregorian date in the form dd:mm:yyyy
     * Unit-x register should be in the form dy.mth.yr.
     * Positions may vary since the template in Unit-x signals it
     * Inverse transformation is done according to the switch "inv" is on or off
     * Results are put in val-X and unit-X. No changing in the piles.
     */
    function panJUL() {
        backX = valX;
        cpySetUnts(xUnit, backXUnit);
        if (butmap.get('inv')) {
            let roper = whatUniqUnit(xUnit, 'dy');
            if (roper[0]) {
                let strX = valX.toString();
                if (!strX.includes(":")) {
                    let grgdy = gregoriandate(valX);
                    valX = fmtReg(grgdy[0]) + ":" + grgdy[1] + ":" + grgdy[2];
                    regX.value = valX;
                    resetPop(xUnit, xRegUnit);
                    xUnit.set('dy', 1);
                    xUnit.set('mth', 1);
                    xUnit.set('yr', 1);
                    setUntsPop(xUnit, xRegUnit);
                }
            }
        } else {
            if (xUnit.size === 3) {
                let arrVX = regX.value.split(':');
                if (arrVX.length === 3) {
                    let arrIN = [0, 0, 0];
                    let k = 0;
                    xUnit.forEach((v, i) => {
                        if (i === 'dy')
                            arrIN[0] = arrVX[k];
                        else if (i === 'mth')
                            arrIN[1] = arrVX[k];
                        else if (i === 'yr')
                            arrIN[2] = arrVX[k];
                        k++;
                    });
                    valX = gregorian2julianday([Number(arrIN[0]), Math.trunc(Number(arrIN[1])), Math.trunc(Number(arrIN[2]))]);
                    regX.value = fmtReg(valX);
                    resetPop(xUnit, xRegUnit);
                    xUnit.set('dy', 1);
                    setUntsPop(xUnit, xRegUnit);
                }
            }
        }
        recvOper();
        rvrsOpe();
    }
    // To Julian day
    $("#jul").click(function () {
        panJUL();
    });
    function GST0UT() {
        if (isOfUnit(xUnit, 'dy')) {
            let mj0 = astrConst.get('J2000.0')[1];
            let t = (valX - mj0) / 36525.0;
            let x = 24110.54841 + (8640184.12866 + (0.093104 - 6.2e-6 * t) * t) * t;
            x /= 3600.0;
            valX = x;
            regX.value = fmtReg(valX);
            resetPop(xUnit, xRegUnit);
            xUnit.set('hour', 1);
            setUntsPop(xUnit, xRegUnit);
        }
    }

    $("#st0").click(function () {
        GST0UT();
    });
    function rvrsOpe() {
        virgin = true;
        entered = false;
        invOpe(0);
    }

    function rvrsFOpe() {
        virgin = true;
        entered = true;
        invOpe(0);
    }

    function factorial(x) {
        if (intVal(x, false) > 0) {
            if (x <= 1) {
                return 1;
            } else
                return x * factorial(x - 1);
        } else {
            return x;
        }
    }

    function panFact() {
        if (adimensional(xUnit)) {
            valX = factorial(valX);
            regX.value = fmtReg(valX);
            rvrsOpe();
            recvOper();
        }
    }

    $("#fact").click(function () {
        panFact();
    });
    function setOpek() {
        fkeys.set('abs', [["ABS", "Absolute value; 'm'"], ["-ABS", "Neg Absolute Value; 'm'"]]);
        fkeys.set('sqr', [["SQR", "Square value of X; 'q'"], ["SQRT", "Square root of X; 'q'"]]);
        fkeys.set('y2x', [["y^x", "Y to exponent X; '^'"], ["x^y", "X to exponent Y; '^'"]]);
        fkeys.set('int', [["INT", "Integer value of X; '|'"], ["FRAC", "Fractionary value of X; '|'"]]);
        fkeys.set('exp', [["EXP", "Exponential function of X; 'x'"], ["LN", "Natural logarithm of X; 'x'"]]);
        fkeys.set('pi', [["PI", "Number PI=3.1415...; 'P'"], ["PI/2", "Half PI=3.1415.../2; 'P'"]]);
        fkeys.set('sin', [["SIN", "Sine of X; 's'"], ["ASIN", "Arc Sine of X; 's'"]]);
        fkeys.set('cos', [["COS", "Cossine of X; 'c'"], ["ACOS", "Arc Cossine of X; 'c'"]]);
        fkeys.set('tan', [["TAN", "Tangent of X; 't'"], ["ATAN", "Arc Tangent of X; 't'"]]);
        fkeys.set('log10', [["10^x", "10 to exponent X; 'X'"], ["LOG", "10 based Logarithm of X; 'X'"]]);
        fkeys.set('snh', [["SNH", "Hyperbolic Sine of X; 'S'"], ["ASNH", "Arc Hyperbolic Sine of X; 'S'"]]);
        fkeys.set('csh', [["CSH", "Hyperbolic Cossine of x; 'C'"], ["ACSH", "Arc Hyperbolic Cossine of X; 'C'"]]);
        fkeys.set('tnh', [["TNH", "Hyperbolic Tangent of X; 'T'"], ["ATNH", "Arc Hyperbolic Tangent of X; 'T'"]]);
        fkeys.set('enter', [["Enter", "Set X-register to given value; 'Enter'"], ["Down", "Drop down the pile; 'Enter'"]]);
        fkeys.set('rlldn', [["RDwn", "Roll down the pile; 'ArrowDown'"], ["RUp", "Roll up the pile; 'ArrowUp'"]]);
        fkeys.set('dot', [[".", ""], [":", ""]]);
        fkeys.set('xy', [["x-y", "Swap X and Y registers; 'ArrowLeft'"], ["LstX", "Last entered X"]]);
        fkeys.set('perc', [["%", "Y/X relation * 100; '%'"], ["D%", "Variation X -> Y * 100; '%'"]]);
        fkeys.set('coals', [["Coalesce", "Coalesce all units to the basic ones; 'Home'"], ["Convert", "Convert units in X to the selected ones; 'Home'"]]);
        fkeys.set('toPolar', [["->P", "y-x to polar coords; 'p'"], ["->R", "r-theta to rectangular coords; 'p'"]]);
        fkeys.set('dms', [["D:M:S", "To format DD:MM:SS; ';'"], ["D.ddd", "To format DD.ddd; ';'"]]);
        fkeys.set('quadr', [["Quad", "Reduce angle to 2*PI quadrant; 'Q'"], ["Atan2", "Gives Atan2(Y,X)"]]);
        fkeys.set('jul', [["JulD", "From Greg. date: day(X) month(Y) year(Z-yyyy) get Julian date; 'j'"], ["GrgD", "From Julian date get Gregorian date: day(X) month(Y) year(Z); 'j'"]]);
        fkeys.set('EqH', [["EqH", "Equatorial coords to Horizontal, phi(Z)-dec(Y)-H(X), returns phi(Z)-z(Y)-A(X); '$'"], ["HEq", "Horizontal coords to Equatorial, phi(Z)-z(Y)-A(X), returns phi(Z)-dec(Y)-H(X); '!'"]]);
        fkeys.set('EEc', [["EEc", "Equatorial coords to Ecliptic, dec(Y)-ra(X), returns b(Y), lambda(X); '@'"], ["EcE", "Ecliptic coords to Equatorial, b(Y)-lambda(X), returns dec(Y)-ra(X); '@'"]]);
        fkeys.set('EGa', [["EGa", "Equatorial coords to Galactic, dec(Y)-ra(X), returns l(Y), b(X); '#'"], ["GaE", "Galactic coords to Equatorial l(Y)-b(X), returns dec(Y)-ra(X); '#'"]]);
    }

    /*
     * Get what format notation to be adopted
     * @returns {Number}
     */
    function getNotation() {
        if (document.getElementById("fxd").checked) {
            return fixNot;
        } else if (document.getElementById("sci").checked) {
            return expNot;
        } else if (document.getElementById("eng").checked) {
            return engiNot;
        } else
            return fixNot;
    }

    function setNotation(not) {
        let nottn = ["fxd", "sci", "eng"];
        nottn.forEach((v, i) => {
            document.getElementById(v).checked = false;
        });
        document.getElementById(not).checked = true;
    }

    /*
     * Get number of digits in the num format
     * @returns {.document@call;getElementById.value}
     */
    function getDigits() {
        var hdigs = document.getElementById("dgts");
        var vdigs = hdigs.value;
        return vdigs;
    }

    function setDigits(n) {
        var hdigs = document.getElementById("dgts");
        hdigs.value = n;
    }

    /**
     * Given Gregorian date, returns Julian day
     * @param gD Array: [{float} d,{int} m,{int} y]
     * @return {Number} Julian day
     */
    function gregorian2julianday(gD) {
        var a = Math.trunc(gD[2] / 100);
        var b;
        if ((gD[2] <= 1582) && (gD[1] <= 10) && (gD[0] < 15))
            b = 0;
        else
            b = 2 - a + Math.trunc(a / 4);
        return juliandate2julianday(gD) + b;
    }

    /**
     * Given Julian date, returns Julian day
     * @param gD Array: [{float} d,{int} m,{int} y]
     * @return {Number} Julian day
     */
    function juliandate2julianday(gD) {
        if (gD[1] <= 2) {
            gD[2]--;
            gD[1] += 12;
        }
        var jd1 = Math.trunc(365.25 * (gD[2] + 4716));
        var jd2 = Math.trunc(30.6001 * (gD[1] + 1));
        return jd1 + jd2 + gD[0] - 1524.5;
    }

    /**
     * Given the Julian day, returns the Gregorian date
     * Valid only after 04/10/1582
     * @param {type} jd Julian day
     * @return {Array} [DD,MM,YYYY] Gregorian date
     */
    function gregoriandate(jd) {
        var adj = Number(jd) + 0.5;
        var z = Math.trunc(adj);
        var a;
        if (z < 2299161) {
            a = z;
        } else {
            var alpha = Math.trunc((z - 1867216.25) / 36524.25);
            a = z + 1 + alpha - Math.trunc(alpha / 4);
        }
        var f = adj - z;
        var b = a + 1524;
        var c = Math.trunc((b - 122.1) / 365.25);
        var d = Math.trunc(365.25 * c);
        var e = Math.trunc((b - d) / 30.6001);
        var rd = b - d - Math.trunc(30.6001 * e) + f;
        var m = e < 14 ? e - 1 : e - 13;
        var iy = m > 2 ? c - 4716 : c - 4715;
        return [rd, m, iy];
    }

    var precision = 1.0e-8;
    var prevGuess = 0;
    var M = 5.6;
    var e = 0.4;
    function panKepler() {
        if (adimensional(yUnit) && kindOfUnit(xUnit, labls[7])) {
            backX = valX;
            resetCpyUnts(xUnit, backXUnit);
            let untk = new Map();
            valX = coalesce(xUnit, valX);
            dumpSetUnit(xUnit);
            cpySetUnts(xUnit, untk);
            dumpSetUnit(untk);
            M = valX;
            e = valY;
            //            smRollDownPile();
            valX = newtonsMethod(M);
            regX.value = fmtReg(valX);
            resetPop(xUnit, xRegUnit);
            cpySetUnts(untk, xUnit);
            dumpSetUnit(xUnit);
            setUntsPop(xUnit, xRegUnit);
            recvOper();
            rvrsOpe();
        }
    }
    //Solve Kepler equation from X = N and e = excentricity
    $("#kepler").click(function () {
        panKepler();
    });
    function f(x) {
        return x - e * Math.sin(x) - M;
    }


    function derivative(f) {
        var h = 0.001;
        return function (x) {
            return (f(x + h) - f(x - h)) / (2 * h);
        };
    }

    function newtonsMethod(guess) {
        if (guess === null || guess === undefined)
            guess = 0;
        if (Math.abs(prevGuess - guess) > precision) {
            prevGuess = guess;
            var approx = guess - (f(guess) / derivative(f)(guess));
            console.log('guess:', guess);
            console.log('f(guess):', f(guess));
            console.log('derivative(f)(guess):', derivative(f)(guess));
            console.log('approx:', approx);
            console.log('\n');
            return newtonsMethod(approx);
        } else {
            return guess;
        }
    }

    function SSS(a, b, c) {
        let A = Math.acos((Math.cos(a) - Math.cos(b) * Math.cos(c)) / (Math.sin(b) * Math.sin(c)));
        let B = Math.acos((Math.cos(b) - Math.cos(c) * Math.cos(a)) / (Math.sin(c) * Math.sin(a)));
        let C = Math.acos((Math.cos(c) - Math.cos(a) * Math.cos(b)) / (Math.sin(a) * Math.sin(b)));
        return [A, B, C];
    }

    function VVV(A, B, C) {
        let a = Math.acos((Math.cos(A) + Math.cos(B) * Math.cos(C)) / (Math.sin(B) * Math.sin(C)));
        let b = Math.acos((Math.cos(B) + Math.cos(C) * Math.cos(A)) / (Math.sin(C) * Math.sin(A)));
        let c = Math.acos((Math.cos(C) + Math.cos(A) * Math.cos(B)) / (Math.sin(A) * Math.sin(B)));
        return [a, b, c];
    }

    function SVS(a, C, b) {
        let c = Math.atan2(Math.sqrt(Math.pow(Math.sin(a) * Math.cos(b) - Math.cos(a) * Math.sin(b) * Math.cos(C), 2) + Math.pow(Math.sin(b) * Math.sin(C), 2)),
                Math.cos(a) * Math.cos(b) + Math.sin(a) * Math.sin(b) * Math.cos(C));
        let A = Math.atan2(Math.sin(a) * Math.sin(C), (Math.sin(b) * Math.cos(a) - Math.cos(b) * Math.sin(a) * Math.cos(C)));
        let B = Math.atan2(Math.sin(b) * Math.sin(C), Math.sin(a) * Math.cos(b) - Math.cos(a) * Math.sin(b) * Math.cos(C));
        return [A, c, B];
    }

    function VSV(A, c, B) {
        let C = Math.acos(Math.sin(A) * Math.sin(B) * Math.cos(c) - Math.cos(A) * Math.cos(B));
        let a = Math.acos((Math.cos(A) + Math.cos(B) * Math.cos(C)) / (Math.sin(B) * Math.sin(C)));
        let b = Math.acos((Math.cos(B) + Math.cos(A) * Math.cos(C)) / (Math.sin(A) * Math.sin(C)));
        return [a, b, C];
    }

    function SSV(b, c, B) {
        if (b > Math.asin(Math.sin(c) * Math.sin(B))) {
            let C = Math.asin(Math.sin(c) * Math.sin(B) / Math.sin(b));
            let a = 2 * Math.atan2(Math.tan((b - c) / 2) * Math.sin((B + C) / 2), Math.sin((B - C) / 2));
            let A = 2 / Math.atan2(Math.tan((b - c) / 2) * Math.sin((b + c) / 2), Math.sin((b - c) / 2));
            return [A, a, C];
        } else {
            return [A, C, a];
        }
    }

    function VVS(A, B, a) {
        let b = Math.asin((Math.sin(a) * Math.sin(B)) / Math.sin(A));
        if (a < Math.PI / 2)
            b = Math.PI - b;
        let c = 2 * Math.atan2(Math.tan((a - b) / 2) * Math.sin((A + B) / 2), Math.sin((A - B) / 2));
        let C = 2 / Math.atan2(Math.tan((A - B) / 2) * Math.sin((a + b) / 2), Math.sin((a - b) / 2));
        return [b, c, C];
    }

    /**
     * Spherical triangle Abc. Given vertice A and the sides b,c
     * Find vertices B,C and side c
     * @param {angle} A
     * @param {angle} b
     * @param {angle} c
     * @returns Array of sides a,b and vertice C
     */
    function bAc(b, A, c) {
        let ca = Math.cos(b) * Math.cos(c) + Math.sin(b) * Math.sin(c) * Math.cos(A);
        let a = Math.acos(ca);
        let sB = Math.sin(A) * Math.sin(b);
        let cB = Math.cos(b) * Math.sin(c) - Math.sin(b) * Math.cos(c) * Math.cos(A);
        let B = Math.atan2(sB, cB);
        let sC = Math.sin(A) * Math.sin(c);
        let cC = Math.cos(c) * Math.sin(b) - Math.sin(c) * Math.cos(b) * Math.cos(A);
        let C = Math.atan2(sC, cC);
        return [B, a, C];
    }

    /**
     * Spherical triangle ABc. Given the side  a, the vertices B and C
     * Find vertex A and the sides b,c
     * @param {angle} a
     * @param {angle} B
     * @param {angle} C
     * @returns {Array} [a,B,C]
     */
    function BaC(B, a, C) {
        let cb = Math.cos(B) * Math.sin(C) + Math.sin(B) * Math.cos(C) * Math.cos(a);
        let sb = Math.sin(B) * Math.sin(a);
        let b = Math.atan2(sb, cb);
        let cc = Math.cos(C) * Math.sin(B) + Math.sin(C) * Math.cos(B) * Math.cos(a);
        let sc = Math.sin(C) * Math.sin(a);
        let c = Math.atan2(sb, cb);
        let cA = -Math.cos(B) * Math.cos(C) + Math.sin(B) * Math.sin(C) * Math.cos(a);
        let sA = Math.cos(B) * Math.sin(C) + Math.sin(B) * Math.cos(C) * Math.cos(a);
        sA /= Math.cos(b);
        let A = Math.atan2(sA, cA);
        return [b, A, c];
    }

    /**
     * Spherical triangle ABa. Given the vertices A,B and side a
     * Find vertice C and sides b,c
     * @param {angle} A
     * @param {angle} B
     * @param {angle} a
     * @returns {Array} [C,b,c]
     */
    function ABa(A, B, a) {
        let sb = Math.sin(a) * Math.sin(B) / Math.sin(A);
        let b = Math.asin(sb);
        let sc = (Math.pow(Math.cos(A) * Math.sin(b), 2) - Math.pow(Math.cos(B) * Math.sin(a), 2)) /
                (Math.cos(A) * Math.cos(a) * Math.sin(b) - Math.cos(B) * Math.cos(b) * Math.sin(a));
        let c = Math.asin(sc);
        let sC = Math.sin(c) * Math.sin(A) / Math.sin(a);
        let cC = -Math.cos(A) * Math.cos(B) + Math.sin(A) * Math.sin(B) * Math.cos(c);
        let C = Math.atan2(sC, cC);
        return [C, b, c];
    }

    /**
     * Spherical triangle ABb. Given vertices A,B and side b.
     * Find vertice C and sides a,c
     * @param {angle} A
     * @param {angle} B
     * @param {angle} b
     * @returns {Array} [a,C,c]
     */
    function ABb(A, B, b) {
        let sa = Math.sin(b) * Math.sin(A) / Math.sin(B);
        let a = Math.asin(sa);
        /*
         let cc = (Math.cos(a) * Math.cos(b) - Math.cos(A) * Math.cos(B) * Math.sin(a) * Math.sin(b)) /
         (1 - Math.pow(Math.cos(B) * Math.sin(a), 2));
         let c = Math.acos(cc);
         let sC = Math.sin(c) * Math.sin(B);
         let cC = Math.cos(c) * Math.sin(a) - Math.sin(c) * Math.cos(a) * Math.cos(B);
         let C = Math.atan2(sC, cC);
         return [a, C, c];
         */
        let rv = ABa(A, B, a);
        return [a, rv[0], rv[2]];
    }

    /**
     * Spherical triangle ABC. Given vertices A,B,C.
     * Find sides a,b,c
     * @param {angle} A
     * @param {angle} B
     * @param {angle} C
     * @returns {Array} [a,b,c]
     */
    function ABC(A, B, C) {
        let ca = (Math.cos(A) + Math.cos(B) * Math.cos(C)) / (Math.sin(B) * Math.sin(C));
        let a = Math.acos(ca);
        let cb = (Math.cos(B) + Math.cos(A) * Math.cos(C)) / (Math.sin(A) * Math.sin(C));
        let b = Math.acos(cb);
        let cc = (Math.cos(C) + Math.cos(A) * Math.cos(B)) / (Math.sin(A) * Math.sin(B));
        let c = Math.acos(cc);
        return [a, b, c];
    }

    /**
     * Spherical triangle abc. Given sides a,b,c.
     * Find vertices A,B,C
     * @param {angle} a
     * @param {angle} b
     * @param {angle} c
     * @returns {Array} [A,B,C]
     */
    function abc(a, b, c) {
        let cA = (Math.cos(a) - Math.cos(b) * Math.cos(c)) / (Math.sin(b) * Math.sin(c));
        let cB = Math.cos(b) * Math.sin(c) - Math.sin(b) * Math.cos(c) * cA;
        let cC = Math.cos(c) * Math.sin(b) - Math.sin(c) * Math.cos(b) * cA;
        let A = Math.acos(cA);
        let sB = Math.sin(b) * Math.sin(A);
        let sC = Math.sin(c) * Math.sin(A);
        let B = Math.atan2(sB, cB);
        let C = Math.atan2(sC, cC);
        return [A, B, C];
    }

    function panTriangles(v) {
        let rv = null;
        if (kindOfUnit(xUnit, labls[7]) && kindOfUnit(yUnit, labls[7])) {
            backX = valX;
            resetCpyUnts(xUnit, backXUnit);
            // Firstly I thought it could store it in memory, but it may
            // shuffle stuff user is doing, so I turned it out.
            //            memreg[7] = valX;
            //            memreg[8] = valY;
            //            memreg[9] = valZ;
            //            cpySetUnts(xUnit, UnMemR[7]);
            //            cpySetUnts(yUnit, UnMemR[8]);
            //            cpySetUnts(zUnit, UnMemR[9]);
            valX = coalesce(xUnit, valX);
            valY = coalesce(yUnit, valY);
            /*
             if (v === "VVV")
             rv = VVV(valZ, valY, valX);
             else if (v === "SSS")
             rv = abc(valZ, valY, valX);
             else if (v === "SSV")
             rv = SSV(valZ, valY, valX);
             else if (v === "VVS")
             rv = ABa(valZ, valY, valX);
             else if (v === "SVS")
             rv = bAc(valZ, valY, valX);
             else if (v === "VSV")
             rv = BaC(valZ, valY, valX);
             */
            if (v === "EqH") {
                if (kindOfUnit(zUnit, labls[7])) {
                    valZ = coalesce(zUnit, valZ);
                    rv = Equ2Hor(valX, valY, valZ); // supp. H->X,dec->Y,phi-Z
                    valZ = valZ * 180.0 / Math.PI;
                    resetPop(zUnit, zRegUnit);
                    zUnit.set('deg', 1);
                    setUntsPop(zUnit, zRegUnit);
                }
            } else if (v === "HEq") {
                if (kindOfUnit(zUnit, labls[7])) {
                    valZ = coalesce(zUnit, valZ);
                    rv = Hor2Equ(valX, valY, valZ); // supp. A-X,Z-Y,phi-Z
                    valZ = valZ * 180.0 / Math.PI;
                    resetPop(zUnit, zRegUnit);
                    zUnit.set('deg', 1);
                    setUntsPop(zUnit, zRegUnit);
                }
            } else if (v === "EEc")
                rv = Equ2Ecl(valX, valY); // supp. ra-X,dec-Y
            else if (v === "EcE")
                rv = Ecl2Equ(valX, valY); // supp. lambda-X,beta-Y
            else if (v === "EGa")
                rv = Equ2Gal(valX, valY); // supp. ra-X,dec-Y
            else if (v === "GaE")
                rv = Gal2Equ(valX, valY); // supp. l-X,b-Y
            //            valZ = rv[0];
            //            valY = rv[1];
            //            valX = rv[2];
            valX = rv[0] * 180.0 / Math.PI;
            valY = rv[1] * 180.0 / Math.PI;
            //            regZ.value = fmtReg(valZ);
            regY.value = fmtReg(valY);
            regX.value = fmtReg(valX);
            resetPop(xUnit, xRegUnit);
            xUnit.set('deg', 1);
            setUntsPop(xUnit, xRegUnit);
            resetPop(yUnit, yRegUnit);
            yUnit.set('deg', 1);
            setUntsPop(yUnit, yRegUnit);
            recvOper();
            rvrsOpe();
        }
    }
    $(".triangles").click(function () {
        panTriangles(this.value);
    });
    /**
     * Transform Equatorial to Local Horizontal coordinates.
     * @param {angle} H - Hour angle
     * @param {angle} delta - declination
     * @param {angle} phi - local latitude
     * @returns {angle,angle} [0] - Azimuth; [1] - Zenithal distance
     */
    function Equ2Hor(H, delta, phi) {
        let cz = Math.sin(phi) * Math.sin(delta) + Math.cos(phi) * Math.cos(delta) * Math.cos(H);
        let z = Math.acos(cz);
        let sa = -Math.cos(delta) * Math.sin(H);
        let ca = Math.sin(delta) * Math.cos(phi) - Math.cos(delta) * Math.sin(phi) * Math.cos(H);
        let a = Math.atan2(sa, ca);
        return [a, z];
    }
    /**
     * Transform Local Horizontal to Equatorial coordinates
     * @param {angle 0:2pi} a - Azimuth
     * @param {-pi:pi} z - Zenithal distance
     * @param {-pi:pi} phi - local latitude
     * @returns {angle(0:2pi),angle(-pi:pi} - [0] - Hour angle; [1] - Declination
     */
    function Hor2Equ(a, z, phi) {
        let sd = Math.cos(z) * Math.sin(phi) + Math.sin(z) * Math.cos(phi) * Math.cos(a);
        let d = Math.asin(sd);
        let sh = -Math.sin(a) * Math.sin(z);
        let ch = Math.cos(z) * Math.cos(phi) - Math.sin(z) * Math.sin(phi) * Math.cos(a);
        let H = Math.atan2(sh, ch);
        return [H, d];
    }
    /**
     * Transform Equatorial to Ecliptic coordinates
     * @param {type} alpha - right ascension
     * @param {type} delta - declination
     * @returns {angle(0:2pi),angle(-pi:pi)} - [0] - ecliptic longitude; [1] - ecliptic latitude
     */
    function Equ2Ecl(alpha, delta) {
        let eps = astrConst.get('&epsilon;')[1];
        let sb = Math.sin(delta) * Math.cos(eps) - Math.cos(delta) * Math.sin(eps) * Math.sin(alpha);
        let beta = Math.asin(sb);
        let sl = Math.sin(delta) * Math.sin(eps) + Math.cos(delta) * Math.cos(eps) * Math.sin(alpha);
        let cl = Math.cos(alpha) * Math.cos(delta);
        let lambda = Math.atan2(sl, cl);
        return [lambda, beta];
    }
    /**
     *
     * @param {type} lambda
     * @param {type} beta
     * @returns {angle(0:2pi),angle(-pi:pi)} - [0] - right ascension; [1] - declination
     */
    function Ecl2Equ(lambda, beta) {
        let eps = astrConst.get('&epsilon;')[1];
        let sd = Math.sin(beta) * Math.cos(eps) + Math.cos(beta) * Math.sin(eps) * Math.sin(lambda);
        let delta = Math.asin(sd);
        let sa = Math.sin(beta) * Math.sin(eps) - Math.cos(beta) * Math.cos(eps) * Math.sin(lambda);
        let ca = Math.cos(beta) * Math.cos(lambda);
        let alpha = Math.atan2(-sa, ca);
        return [alpha, delta];
    }
    /**
     * Transform equatorial to galactic coordinates
     * @param {type} alpha
     * @param {type} delta
     * @returns {angle(0:2pi),angle(-pi:pi)} - [0] - galactic longitude; [1] - galactic latitude
     */
    function Equ2Gal(alpha, delta) {
        let ag = alpha - (tddd('12:49:00') * 15.0) * Math.PI / 180.0;
        let dg = tddd('27:24:00') * Math.PI / 180.0;
        let bn = 123.0 * Math.PI / 180.0;
        let sl = Math.sin(dg) * Math.sin(delta) + Math.cos(dg) * Math.cos(delta) * Math.cos(ag);
        let sb = Math.sin(ag) * Math.cos(delta);
        let cb = Math.sin(delta) * Math.cos(dg) - Math.cos(delta) * Math.sin(dg) * Math.cos(ag);
        let b = Math.atan2(-sb, cb) + bn;
        //        let l = Math.asin(sl);
        let l = Math.atan2(sl, Math.sqrt(cb * cb + sb * sb));
        return [b, l];
    }
    /**
     * Transform galactic to equatorial coordinates
     * @param {type} l
     * @param {type} b
     * @returns {angle[0:2pi),angle(-pi,pi)} - [0] - right ascension, [1] - declination
     */
    function Gal2Equ(b, l) {
        let ag = (tddd('12:49:00') * 15.0) * Math.PI / 180.0;
        let dg = tddd('27:24:00') * Math.PI / 180.0;
        let bn = b - 123.0 * Math.PI / 180.0;
        let sd = Math.sin(dg) * Math.sin(l) + Math.cos(dg) * Math.cos(l) * Math.cos(bn);
        let delta = Math.asin(sd);
        let sa = Math.sin(bn) * Math.cos(l);
        let ca = Math.sin(l) * Math.cos(dg) - Math.cos(l) * Math.sin(dg) * Math.cos(bn);
        let alpha = Math.atan2(-sa, ca) + ag;
        return [alpha, delta];
    }
    function exec(f, x, y, z) {
        let retv = eval(f)(x, y, z); // They say this call is unsafe but what they suggest fails
        console.log(retv);
    }
    const asteroids = new Map();
    asteroids.set('Name', ['astepoch', 'asta', 'aste', 'asti', 'astomega', 'astOmega', 'astM0', 'astH', 'astG']);
    asteroids.set('Title', ['Epoch of the elements represented as the Modified Julian Date (MJD)', 'Semimajor axis', 'Eccentricity of the orbit',
        'Inclination of the orbit with respect to the J2000 ecliptic plane', 'Argument of perihelion', 'Longitude of ascending node',
        'Mean anomaly', 'Absolute magnitude', 'Magnitude slope parameter']);
    asteroids.set('units', ['dy', 'AU', '', 'deg', 'deg', 'deg', 'deg', '', '']);
    asteroids.set('Aaltje', [59800, 2.9542014, 0.04950567, 8.48671, 275.15380, 272.69230, 57.5250675, 9.61, 0.15]);
    asteroids.set('Abastumani', [59800, 3.4356469, 0.03643047, 19.93417, 333.01609, 28.88452, 239.6326330, 9.19, 0.15]);
    asteroids.set('Abnoba', [60000, 2.7895894, 0.18060596, 14.47597, 7.54525, 229.00339, 148.6518893, 9.18, 0.15]);
    asteroids.set('Abundantia', [60000, 2.5919155, 0.03551016, 6.43172, 132.88285, 38.73743, 346.8228365, 9.21, 0.15]);
    asteroids.set('Achates', [60000, 5.1836554, 0.27291283, 8.91723, 331.88109, 322.81347, 5.0771983, 9.17, 0.15]);
    asteroids.set('Ada', [59800, 2.9667504, 0.17914927, 4.31243, 189.90429, 260.59953, 95.3704969, 9.92, 0.15]);
    asteroids.set('Adelheid', [60000, 3.1237833, 0.06333374, 21.65728, 264.78869, 210.98488, 275.0018091, 8.63, 0.15]);
    asteroids.set('Adelinda', [60000, 3.4210694, 0.13703239, 2.07727, 309.08956, 27.82711, 93.8936468, 9.25, 0.15]);
    asteroids.set('Adeona', [60000, 2.6724115, 0.14671022, 12.61958, 45.24279, 77.32817, 53.6484206, 8.21, 0.15]);
    asteroids.set('Adorea', [59800, 3.0938293, 0.13676071, 2.44036, 68.37653, 120.85399, 342.2247285, 8.51, 0.15]);
    asteroids.set('Adria', [59800, 2.7616901, 0.07346403, 11.44377, 252.13202, 332.97283, 339.1357991, 9.17, 0.15]);
    asteroids.set('Aegina', [59800, 2.5901094, 0.10696386, 2.10330, 74.37902, 10.43908, 90.4411923, 8.95, 0.15]);
    asteroids.set('Aegle', [60000, 3.0506065, 0.14161560, 15.97981, 208.09409, 321.49293, 4.0005343, 7.71, 0.15]);
    asteroids.set('Aemilia', [60000, 3.1136971, 0.10135772, 6.11377, 332.73415, 133.97691, 286.9496842, 8.36, 0.15]);
    asteroids.set('Aeria', [59800, 2.6485026, 0.09716079, 12.71708, 269.89502, 94.14317, 255.7242786, 8.70, 0.15]);
    asteroids.set('Aeternitas', [59800, 2.7881530, 0.12540278, 10.61532, 279.12133, 42.02447, 189.8374353, 8.73, 0.15]);
    asteroids.set('Aethra', [60000, 2.6125064, 0.38765305, 24.95440, 255.48861, 258.14533, 239.7328736, 8.95, 0.15]);
    asteroids.set('Aglaja', [59800, 2.8809241, 0.13006470, 4.97566, 315.17236, 3.05343, 293.4939080, 8.19, 0.16]);
    asteroids.set('Agrippina', [60000, 3.2125725, 0.13894894, 7.06987, 88.74037, 359.22640, 8.4884563, 9.82, 0.15]);
    asteroids.set('Aida', [60000, 3.1405699, 0.09992993, 8.05658, 192.40424, 114.94993, 191.4050816, 9.74, 0.15]);
    asteroids.set('Aidamina', [60000, 3.2041099, 0.23116041, 21.60644, 132.69792, 216.52162, 138.1705456, 9.62, 0.15]);
    asteroids.set('Alauda', [59800, 3.1953279, 0.01643218, 20.59567, 353.52191, 289.73421, 258.3911056, 7.43, 0.15]);
    asteroids.set('Alcathous', [60000, 5.1772409, 0.06588606, 16.62780, 292.92640, 267.99769, 103.5852003, 8.62, 0.15]);
    asteroids.set('Alekto', [60000, 3.0936772, 0.20514472, 4.64751, 284.21578, 300.56143, 82.4878876, 9.91, 0.15]);
    asteroids.set('Alemannia', [60000, 2.5923613, 0.11894195, 6.81574, 125.90557, 248.72849, 80.1246164, 9.81, 0.15]);
    asteroids.set('Aletheia', [60000, 3.1306895, 0.12979157, 10.80969, 166.73070, 86.79001, 210.2303515, 7.90, 0.15]);
    asteroids.set('Alexandra', [59800, 2.7115407, 0.19693506, 11.79645, 345.22112, 313.23912, 282.9837290, 7.87, 0.15]);
    asteroids.set('Alikoski', [59800, 3.2104719, 0.08225300, 17.27851, 110.24510, 51.43113, 83.8672981, 9.78, 0.15]);
    asteroids.set('Aline', [59800, 2.8061570, 0.15420867, 13.39923, 151.81999, 235.81770, 153.0935429, 8.81, 0.15]);
    asteroids.set('Alkeste', [59800, 2.6306813, 0.07738179, 2.96313, 62.27582, 187.90319, 131.0820909, 8.14, 0.19]);
    asteroids.set('Alkmene', [59800, 2.7634836, 0.22044393, 2.82629, 111.00043, 25.43734, 73.3777346, 8.30, 0.28]);
    asteroids.set('Alphonsina', [59800, 2.7004353, 0.08091432, 21.09801, 201.70128, 299.52912, 19.5232445, 8.45, 0.15]);
    asteroids.set('Althaea', [60000, 2.5810942, 0.08160065, 5.78753, 171.41158, 203.63346, 323.6793036, 8.44, 0.15]);
    asteroids.set('Altona', [60000, 2.9987940, 0.12870677, 15.52112, 134.65850, 120.97134, 148.5432827, 9.71, 0.15]);
    asteroids.set('Amalthea', [60000, 2.3773984, 0.08576394, 5.04118, 79.09947, 123.42931, 152.3496723, 8.62, 0.35]);
    asteroids.set('Amaryllis', [59800, 3.1836824, 0.04157919, 6.64005, 129.73642, 139.95838, 350.0904427, 9.88, 0.15]);
    asteroids.set('Ambrosia', [59800, 2.5998426, 0.29762605, 11.99436, 82.50107, 349.50929, 127.3211102, 9.81, 0.15]);
    asteroids.set('Amelia', [60000, 3.1341300, 0.20384993, 14.81019, 265.21872, 92.51712, 28.9217586, 9.42, 0.15]);
    asteroids.set('Amherstia', [60000, 2.6777791, 0.27484314, 12.95299, 258.06254, 328.73835, 204.9594507, 8.29, 0.15]);
    asteroids.set('Ampella', [60000, 2.4590363, 0.22797282, 9.32128, 89.15740, 268.21578, 23.9904613, 8.53, 0.15]);
    asteroids.set('Amphitrite', [60000, 2.5537536, 0.07368241, 6.08278, 63.01536, 356.32872, 262.5768759, 5.97, 0.20]);
    asteroids.set('Anacostia', [60000, 2.7402087, 0.20238405, 15.89759, 69.69419, 285.79082, 119.6138713, 7.96, 0.06]);
    asteroids.set('Anahita', [59800, 2.1985546, 0.15015457, 2.36708, 80.57812, 254.31694, 164.4730566, 8.86, 0.15]);
    asteroids.set('Andromache', [60000, 3.1836256, 0.23258851, 3.21923, 319.74165, 21.26880, 92.7849195, 8.61, 0.15]);
    asteroids.set('Angelina', [59800, 2.6804143, 0.12569130, 1.30586, 180.87702, 308.99223, 305.6966102, 7.72, 0.48]);
    asteroids.set('Ani', [60000, 3.1251352, 0.19251780, 16.37553, 201.78983, 129.80642, 211.2440080, 9.23, 0.15]);
    asteroids.set('Antenor', [60000, 5.1693661, 0.01245793, 6.80254, 303.27297, 159.02806, 226.8537223, 8.97, 0.15]);
    asteroids.set('Antigone', [60000, 2.8669796, 0.21294361, 12.27119, 110.73896, 135.66359, 224.5127330, 7.04, 0.33]);
    asteroids.set('Antilochus', [60000, 5.1436735, 0.05391792, 28.49054, 187.50926, 221.37701, 49.2678253, 8.60, 0.15]);
    asteroids.set('Antiope', [60000, 3.1504173, 0.16780713, 2.20695, 245.25196, 69.93776, 31.8440815, 8.50, 0.15]);
    asteroids.set('Apollonia', [60000, 2.8781362, 0.15300174, 3.55521, 252.37162, 172.14477, 305.3442798, 9.20, 0.15]);
    asteroids.set('Aquitania', [60000, 2.7412567, 0.23517750, 18.11224, 157.53972, 128.20922, 44.9786666, 7.60, 0.15]);
    asteroids.set('Ara', [60000, 3.1439553, 0.20104412, 19.53740, 62.86413, 228.27253, 140.4192490, 8.21, 0.15]);
    asteroids.set('Arabis', [60000, 3.0143000, 0.08915667, 10.06564, 25.76898, 30.13315, 29.5965479, 9.85, 0.15]);
    asteroids.set('Arachne', [60000, 2.6261646, 0.07104180, 7.51698, 81.86372, 294.54012, 351.5294468, 9.13, 0.15]);
    asteroids.set('Arctica', [60000, 3.0451593, 0.05956534, 17.63844, 310.43446, 218.62011, 287.0235779, 9.53, 0.15]);
    asteroids.set('Arduina', [60000, 2.7637901, 0.22813794, 6.22065, 271.28066, 66.86343, 25.7183459, 9.78, 0.15]);
    asteroids.set('Arequipa', [59800, 2.5910347, 0.24460881, 12.36810, 134.23802, 184.61558, 185.1831806, 9.02, 0.15]);
    asteroids.set('Arete', [60000, 2.7395368, 0.16324296, 8.78890, 245.98982, 81.57635, 182.7968308, 9.46, 0.15]);
    asteroids.set('Arethusa', [60000, 3.0668674, 0.15366960, 12.99646, 153.34137, 242.96924, 332.0231841, 8.04, 0.15]);
    asteroids.set('Argentina', [60000, 3.1911446, 0.15982215, 11.47267, 213.80085, 333.07167, 204.8758801, 8.73, 0.15]);
    asteroids.set('Ariadne', [60000, 2.2027705, 0.16873724, 3.47069, 16.20997, 264.76058, 200.0068226, 8.00, 0.11]);
    asteroids.set('Armenia', [60000, 3.1132493, 0.09670121, 19.08020, 211.86856, 144.79162, 59.3679812, 9.05, 0.15]);
    asteroids.set('Armida', [60000, 3.0473467, 0.03733772, 3.88006, 111.55710, 268.52489, 132.9354098, 9.23, 0.15]);
    asteroids.set('Armor', [59800, 3.0495347, 0.16659334, 5.56363, 28.67480, 250.08124, 287.7913711, 8.97, 0.15]);
    asteroids.set('Arosa', [60000, 3.1927781, 0.12180145, 18.97094, 147.77174, 86.35600, 192.5480377, 9.22, 0.15]);
    asteroids.set('Arsinoe', [60000, 2.5916118, 0.20113461, 14.09808, 120.65428, 92.47479, 247.5541452, 9.18, 0.15]);
    asteroids.set('Artemis', [60000, 2.3724931, 0.17870451, 21.45600, 57.11836, 188.22253, 183.6140214, 8.76, 0.10]);
    asteroids.set('Aschera', [60000, 2.6106923, 0.03042875, 3.43749, 136.05982, 341.92604, 3.0890403, 9.31, 0.51]);
    asteroids.set('Asia', [59800, 2.4223038, 0.18467958, 6.02885, 107.04524, 202.38892, 232.3453834, 8.38, 0.15]);
    asteroids.set('Aspasia', [60000, 2.5768490, 0.07188606, 11.26756, 354.20446, 242.10424, 112.1434691, 7.70, 0.29]);
    asteroids.set('Asporina', [59800, 2.6948706, 0.10883672, 15.62162, 96.20059, 162.27758, 303.2406077, 8.53, 0.15]);
    asteroids.set('Asterope', [59800, 2.6596290, 0.09966804, 7.69207, 126.47580, 221.94801, 276.9718482, 8.46, 0.15]);
    asteroids.set('Astraea', [59800, 2.5775402, 0.18898516, 5.36542, 358.79238, 141.56750, 208.5676966, 7.01, 0.15]);
    asteroids.set('Atala', [59800, 3.1396294, 0.08164613, 12.12266, 58.94369, 39.87887, 83.1800339, 8.31, 0.15]);
    asteroids.set('Atalante', [59800, 2.7461150, 0.30582781, 18.37405, 47.78195, 358.20182, 199.5006771, 8.61, 0.15]);
    asteroids.set('Ate', [60000, 2.5935709, 0.10281816, 4.93142, 168.22325, 305.68654, 34.9241676, 8.23, 0.15]);
    asteroids.set('Athamantis', [59800, 2.3831042, 0.06218425, 9.45056, 139.26977, 239.79081, 345.7841599, 7.55, 0.27]);
    asteroids.set('Athor', [59800, 2.3800104, 0.13698670, 9.05765, 294.82308, 18.55083, 219.7812996, 9.19, 0.13]);
    asteroids.set('Aurelia', [60000, 2.5951412, 0.25194492, 3.93122, 44.44576, 229.03064, 142.9049588, 8.63, 0.15]);
    asteroids.set('Aurora', [59800, 3.1568340, 0.09498901, 7.97108, 60.17135, 2.55364, 159.9065623, 7.69, 0.15]);
    asteroids.set('Ausonia', [60000, 2.3942555, 0.12814532, 5.77390, 295.91146, 337.69751, 151.7918748, 7.56, 0.25]);
    asteroids.set('Austria', [59800, 2.2870798, 0.08458521, 9.58065, 132.60693, 186.40308, 199.2442856, 9.77, 0.15]);
    asteroids.set('Automedon', [60000, 5.1133887, 0.02812792, 21.11225, 198.11939, 230.94759, 14.4390232, 8.87, 0.15]);
    asteroids.set('Axius', [60000, 5.1416831, 0.16689978, 22.70784, 269.21470, 71.04211, 329.7818272, 9.89, 0.15]);
    asteroids.set('Badenia', [59800, 3.1325292, 0.15997960, 3.73917, 23.00226, 353.15466, 162.0626388, 9.52, 0.15]);
    asteroids.set('Bamberga', [59800, 2.6814253, 0.34152883, 11.10284, 44.14877, 327.85865, 359.4891213, 7.11, 0.09]);
    asteroids.set('Bandusia', [60000, 2.6720393, 0.14412956, 12.79933, 307.19445, 36.45677, 159.5910909, 9.24, 0.15]);
    asteroids.set('Barbara', [59800, 2.3859538, 0.24512124, 15.37540, 192.32974, 144.49796, 245.4723597, 9.10, 0.15]);
    asteroids.set('Bathilde', [59800, 2.8067150, 0.08133406, 8.15731, 202.90376, 253.50653, 88.0351307, 8.64, 0.15]);
    asteroids.set('Bathseba', [59800, 3.0226612, 0.13406130, 10.17599, 257.46180, 167.81373, 144.4269070, 9.62, 0.15]);
    asteroids.set('Baucis', [59800, 2.3799152, 0.11491739, 10.01807, 359.45434, 331.91242, 45.8090259, 8.76, 0.15]);
    asteroids.set('Beate', [59800, 3.0945806, 0.03825474, 8.92224, 157.94523, 159.17709, 217.8498671, 9.69, 0.15]);
    asteroids.set('Beatrix', [59800, 2.4331324, 0.08174800, 4.96694, 169.71207, 27.66878, 180.2498579, 8.78, 0.15]);
    asteroids.set('Begonia', [59800, 3.1164316, 0.21359406, 12.10782, 3.94770, 113.75681, 94.0072553, 9.80, 0.15]);
    asteroids.set('Belisana', [59800, 2.4604992, 0.04227555, 1.89348, 211.68814, 51.08413, 322.4511150, 9.44, 0.15]);
    asteroids.set('Bella', [60000, 2.5394574, 0.16044407, 13.84548, 79.80903, 275.47380, 48.0682845, 9.12, 0.15]);
    asteroids.set('Bellona', [60000, 2.7759222, 0.15102581, 9.42907, 343.72283, 144.28951, 212.2688885, 7.27, 0.15]);
    asteroids.set('Belopolskya', [60000, 3.3982556, 0.08921461, 2.97996, 214.98517, 153.52854, 308.3852054, 9.84, 0.15]);
    asteroids.set('Benda', [59800, 3.1452683, 0.10070469, 5.80641, 65.89670, 3.13228, 193.4377165, 9.99, 0.15]);
    asteroids.set('Benjamina', [59800, 3.1979297, 0.10759315, 7.71207, 321.13415, 243.03041, 180.0765717, 9.36, 0.15]);
    asteroids.set('Benkoela', [59800, 3.1995734, 0.02811272, 25.41780, 97.89759, 116.91856, 69.2833227, 9.16, 0.15]);
    asteroids.set('Berbericia', [60000, 2.9323125, 0.16629210, 18.23519, 306.52496, 79.67148, 347.8688488, 7.76, 0.34]);
    asteroids.set('Berenike', [60000, 3.0124413, 0.04421182, 11.28760, 61.29194, 132.75886, 242.1047621, 9.34, 0.15]);
    asteroids.set('Bertha', [60000, 3.2064326, 0.07499712, 21.01912, 163.75196, 36.53869, 174.7258680, 7.71, 0.15]);
    asteroids.set('Bertholda', [60000, 3.4203738, 0.02740164, 6.68724, 232.77586, 242.52870, 238.2257416, 8.38, 0.15]);
    asteroids.set('Bettina', [59800, 3.1449228, 0.13589593, 12.81949, 75.82078, 23.80850, 86.5249225, 7.58, 0.15]);
    asteroids.set('Bianca', [59800, 2.6677950, 0.11677489, 15.19877, 62.47442, 170.56605, 308.5640230, 8.62, 0.32]);
    asteroids.set('Biarmia', [60000, 3.0438464, 0.25507787, 17.06334, 63.61547, 213.83181, 195.9088385, 9.83, 0.15]);
    asteroids.set('Bias', [60000, 5.1955592, 0.07747496, 28.55675, 193.47297, 233.52594, 0.7744568, 9.93, 0.15]);
    asteroids.set('Bohemia', [59800, 2.7270971, 0.06340066, 7.40043, 342.13873, 283.38825, 266.2598187, 8.72, 0.15]);
    asteroids.set('Bohlinia', [59800, 2.8869130, 0.01848446, 2.35373, 110.23258, 35.67833, 80.6535430, 9.68, 0.15]);
    asteroids.set('Boliviana', [60000, 2.5761200, 0.18511834, 12.75546, 181.48119, 230.69359, 71.5662767, 8.67, 0.03]);
    asteroids.set('Bononia', [60000, 3.9693095, 0.21049850, 12.61358, 68.02964, 18.78442, 270.0132696, 8.45, 0.15]);
    asteroids.set('Bouzareah', [59800, 3.2264244, 0.10998845, 13.50178, 21.92616, 35.66703, 91.8680572, 9.76, 0.15]);
    asteroids.set('Brambilla', [60000, 3.1607608, 0.07872173, 13.36972, 29.18113, 234.87332, 259.1729608, 9.26, 0.15]);
    asteroids.set('Bredichina', [60000, 3.1749998, 0.15907921, 14.51728, 133.76758, 89.74971, 81.5848186, 8.98, 0.15]);
    asteroids.set('Brixia', [60000, 2.7440891, 0.27849606, 10.58175, 316.11025, 89.59744, 109.7257831, 8.58, -0.06]);
    asteroids.set('Brouwer', [59800, 3.9537976, 0.20901041, 8.36512, 47.78384, 321.93793, 157.6570844, 9.97, 0.15]);
    asteroids.set('Bruchsalia', [59800, 2.6560426, 0.29533079, 12.01538, 273.48965, 76.08541, 0.7672655, 8.94, 0.15]);
    asteroids.set('Brucia', [59800, 2.3821020, 0.29960292, 24.25536, 291.56141, 97.29328, 228.6237334, 9.55, 0.15]);
    asteroids.set('Brunhild', [60000, 2.6945100, 0.12098590, 6.41336, 125.25176, 307.71870, 272.3765629, 8.92, 0.15]);
    asteroids.set('Budrosa', [60000, 2.9111528, 0.01819677, 6.03904, 109.20960, 287.30781, 59.6591434, 8.60, 0.15]);
    asteroids.set('Burdigala', [60000, 2.6520776, 0.14538060, 5.59062, 34.89965, 47.67222, 1.2231609, 9.44, 0.15]);
    asteroids.set('Burgundia', [60000, 2.7800677, 0.07898002, 8.99444, 26.12550, 218.98187, 84.7537610, 8.84, 0.15]);
    asteroids.set('Burnhamia', [59800, 3.1825275, 0.20073804, 3.97978, 91.52708, 182.66332, 346.2459829, 9.49, 0.15]);
    asteroids.set('Byblis', [60000, 3.1623598, 0.18248048, 15.47443, 179.68210, 88.41992, 146.9895846, 8.53, 0.15]);
    asteroids.set('Caecilia', [60000, 3.1673628, 0.13927736, 7.55207, 353.63993, 331.89538, 177.3682629, 9.16, 0.15]);
    asteroids.set('Caia', [59800, 2.9922213, 0.24414408, 9.99258, 356.61449, 18.39669, 180.2191789, 9.43, 0.15]);
    asteroids.set('Calvinia', [60000, 2.8917271, 0.08221204, 2.89586, 206.19462, 151.70062, 59.8353397, 9.99, 0.15]);
    asteroids.set('Camelia', [60000, 2.9197326, 0.08160767, 14.76077, 226.14242, 232.63848, 35.2210506, 9.94, 0.15]);
    asteroids.set('Camilla', [60000, 3.4862507, 0.06524004, 10.00442, 305.33911, 172.58676, 179.4777019, 7.13, 0.08]);
    asteroids.set('Campania', [60000, 2.6905056, 0.07541318, 6.67757, 196.35212, 209.93055, 89.1236018, 9.10, 0.15]);
    asteroids.set('Cantabia', [60000, 3.0631390, 0.10561459, 10.80370, 49.99685, 115.79461, 215.1626919, 9.16, 0.15]);
    asteroids.set('Caprera', [60000, 2.7208645, 0.21833403, 8.67873, 269.29113, 136.00311, 9.2174302, 9.77, 0.15]);
    asteroids.set('Carina', [60000, 3.1950199, 0.08476579, 18.87249, 230.40485, 175.34419, 353.3072375, 9.07, 0.15]);
    asteroids.set('Carlova', [60000, 3.0047068, 0.17371964, 11.74163, 289.97311, 132.19663, 82.5194348, 8.57, 0.15]);
    asteroids.set('Carmen', [60000, 2.9072622, 0.03843569, 8.37442, 314.15963, 143.64842, 331.2245398, 9.11, 0.15]);
    asteroids.set('Carolina', [60000, 2.8825736, 0.06107892, 9.02955, 208.01689, 65.98880, 302.9273452, 8.93, 0.15]);
    asteroids.set('Catriona', [60000, 2.9263786, 0.22402477, 16.55185, 83.25735, 356.21313, 21.6574474, 9.85, 0.15]);
    asteroids.set('Cava', [60000, 2.6862126, 0.24258475, 9.82171, 336.99040, 90.77451, 37.4645023, 8.80, -0.03]);
    asteroids.set('Celuta', [60000, 2.3623370, 0.14961786, 13.18664, 315.50694, 14.71723, 207.1118140, 9.02, 0.15]);
    asteroids.set('Centesima', [59800, 3.0126600, 0.08497885, 9.73516, 225.78930, 184.42909, 201.8333582, 9.57, 0.15]);
    asteroids.set('Ceres', [59800, 2.7666190, 0.07863576, 10.58680, 73.53163, 80.26644, 334.3271699, 3.33, 0.12]);
    asteroids.set('Chaldaea', [59800, 2.3742949, 0.18203625, 11.65203, 315.84752, 176.57548, 134.9200980, 9.09, 0.15]);
    asteroids.set('Charis', [60000, 2.8991583, 0.05869633, 6.47400, 178.09723, 142.46095, 356.6347630, 9.95, 0.15]);
    asteroids.set('Charlotte', [60000, 3.0604744, 0.15167985, 8.46024, 108.35020, 294.83128, 14.5172301, 9.49, 0.15]);
    asteroids.set('Charops', [60000, 5.1460042, 0.12693675, 16.23668, 354.22318, 300.86985, 32.3071058, 9.83, 0.15]);
    asteroids.set('Charybdis', [60000, 3.0026905, 0.06568194, 6.45071, 329.43255, 354.18827, 108.6645585, 8.71, 0.07]);
    asteroids.set('Cheruskia', [60000, 2.8812244, 0.16874519, 18.39587, 173.80509, 249.76314, 288.4023842, 9.50, 0.15]);
    asteroids.set('Chicago', [60000, 3.8939335, 0.02502342, 4.64147, 153.63860, 130.16485, 53.2470478, 7.73, 0.15]);
    asteroids.set('Chloe', [59800, 2.5586395, 0.11228496, 11.83245, 17.25332, 129.33634, 73.4417147, 9.06, 0.15]);
    asteroids.set('Chloris', [60000, 2.7251220, 0.24107027, 10.96245, 172.78324, 96.92440, 292.2036394, 8.38, 0.15]);
    asteroids.set('Christa', [59800, 3.2069811, 0.08859130, 9.44497, 286.68655, 120.13689, 146.6790004, 9.25, 0.15]);
    asteroids.set('Christine', [60000, 2.5814673, 0.04334834, 11.52341, 205.18522, 112.09195, 177.6456631, 9.33, 0.15]);
    asteroids.set('Chryseis', [59800, 3.0706729, 0.10415653, 8.85009, 359.85153, 136.71995, 55.7255380, 7.61, 0.15]);
    asteroids.set('Circe', [59800, 2.6873324, 0.10657427, 5.49732, 330.15214, 184.33137, 35.8220404, 8.69, 0.15]);
    asteroids.set('Clementina', [59800, 3.1621080, 0.06632793, 10.03473, 159.79733, 201.92387, 152.8304756, 9.83, 0.15]);
    asteroids.set('Cloelia', [60000, 3.0147512, 0.03814334, 9.24785, 183.52695, 335.59061, 337.9566195, 9.69, 0.15]);
    asteroids.set('Coelestina', [60000, 2.7629819, 0.07120238, 9.74681, 200.87105, 84.22257, 46.6889205, 9.20, 0.15]);
    asteroids.set('Cohnia', [60000, 3.0575074, 0.23600910, 8.36724, 93.31478, 281.44347, 17.5148202, 9.63, 0.15]);
    asteroids.set('Comacina', [60000, 3.1523317, 0.04817068, 12.99308, 8.69996, 166.69914, 348.6625016, 8.51, 0.15]);
    asteroids.set('Concordia', [60000, 2.6987008, 0.04496425, 5.07258, 34.08594, 161.06330, 246.0268163, 9.05, 0.15]);
    asteroids.set('Corduba', [59800, 2.8042073, 0.15678419, 12.79983, 215.49335, 185.14065, 337.0989680, 9.26, 0.15]);
    asteroids.set('Cornelia', [60000, 2.8918642, 0.05727971, 4.04832, 123.69191, 60.95813, 185.5969748, 9.81, 0.15]);
    asteroids.set('Crescentia', [59800, 2.5330586, 0.10727894, 15.20094, 105.98262, 156.92537, 3.2739175, 9.12, 0.15]);
    asteroids.set('Crimea', [59800, 2.7725311, 0.11030027, 14.11625, 310.17632, 72.07840, 88.5946432, 9.81, 0.15]);
    asteroids.set('Croatia', [59800, 3.1359382, 0.04012843, 10.79722, 228.28686, 177.44562, 117.1156447, 9.15, 0.15]);
    asteroids.set('Cunningham', [59800, 3.9409124, 0.16935535, 12.15533, 110.14173, 162.83555, 307.7269468, 9.78, 0.15]);
    asteroids.set('Cyane', [59800, 2.8093792, 0.09805956, 9.15839, 254.39130, 244.34056, 91.7887430, 8.98, 0.15]);
    asteroids.set('Cybele', [60000, 3.4351637, 0.11896838, 3.56358, 103.73287, 155.52627, 116.7777131, 6.90, 0.01]);
    asteroids.set('Cyrene', [59800, 3.0630039, 0.13456658, 7.21363, 290.28712, 318.99618, 359.8582815, 8.12, 0.13]);
    asteroids.set('Danae', [60000, 2.9855954, 0.16449118, 18.20788, 12.78505, 333.57323, 179.4896663, 7.65, 0.15]);
    asteroids.set('Daphne', [59800, 2.7607675, 0.27443244, 15.78983, 45.92301, 178.05585, 32.0740993, 7.52, 0.10]);
    asteroids.set('Davida', [59800, 3.1618818, 0.18862392, 15.94133, 337.12286, 107.58218, 184.4891460, 6.43, 0.16]);
    asteroids.set('Deiphobus', [60000, 5.1349387, 0.04619725, 26.90013, 0.77871, 283.70595, 38.3687575, 8.45, 0.15]);
    asteroids.set('Dejopeja', [60000, 3.1941187, 0.06349872, 1.13835, 212.01011, 331.54660, 172.5201039, 8.45, 0.15]);
    asteroids.set('Dembowska', [59800, 2.9238843, 0.08974278, 8.25058, 344.36114, 32.19142, 22.4653219, 6.04, 0.37]);
    asteroids.set('Denise', [60000, 3.1864137, 0.18909966, 25.39268, 305.19889, 153.24618, 263.0107744, 9.38, 0.15]);
    asteroids.set('Desiderata', [60000, 2.5951991, 0.31400776, 18.35309, 237.49468, 47.99541, 146.4107013, 8.36, 0.15]);
    asteroids.set('Devosa', [59800, 2.3834899, 0.13629935, 7.86005, 99.44384, 355.34370, 38.1332735, 8.82, 0.19]);
    asteroids.set('Diana', [60000, 2.6237115, 0.20371747, 8.68080, 152.94237, 333.34594, 283.2685418, 8.36, 0.08]);
    asteroids.set('Dido', [59800, 3.1476397, 0.05539142, 7.17007, 249.83717, 0.63905, 338.5043907, 8.29, 0.15]);
    asteroids.set('Dike', [60000, 2.6626304, 0.19720549, 13.86481, 195.56996, 41.40737, 201.6742908, 9.51, 0.15]);
    asteroids.set('Dione', [60000, 3.1812391, 0.15938282, 4.57572, 331.50301, 61.99146, 106.6235911, 7.64, 0.15]);
    asteroids.set('Diotima', [59800, 3.0690341, 0.03494135, 11.24043, 199.49147, 69.35630, 281.5091934, 7.36, 0.15]);
    asteroids.set('Dodona', [60000, 3.1205160, 0.17061754, 7.39121, 270.43142, 313.46548, 74.8638087, 8.83, 0.15]);
    asteroids.set('Doris', [60000, 3.1171105, 0.06826916, 6.55985, 250.87626, 183.44869, 322.7298836, 7.19, 0.15]);
    asteroids.set('Dorothea', [60000, 3.0120967, 0.09923414, 9.96658, 164.67850, 173.49066, 3.8279358, 9.46, 0.15]);
    asteroids.set('Dracius', [60000, 5.1926297, 0.06199439, 22.23987, 9.29673, 86.43679, 321.9654771, 9.17, 0.15]);
    asteroids.set('Dubiago', [59800, 3.4165720, 0.06823143, 5.74551, 72.79034, 223.35421, 233.9004210, 9.81, 0.15]);
    asteroids.set('Dynamene', [59800, 2.7382752, 0.13260266, 6.89883, 86.88729, 324.26673, 127.3780494, 8.46, 0.15]);
    asteroids.set('Dysona', [59800, 3.1904485, 0.10044171, 23.51689, 320.60070, 322.17874, 241.2276004, 9.62, 0.15]);
    asteroids.set('Echo', [60000, 2.3916171, 0.18514636, 3.60115, 271.01669, 191.54106, 221.5936269, 8.57, 0.27]);
    asteroids.set('Edisona', [60000, 3.0133145, 0.11509084, 11.20141, 283.82941, 64.14228, 158.1731059, 9.52, 0.15]);
    asteroids.set('Edith', [59800, 3.1552721, 0.17956016, 3.22739, 143.59928, 273.81342, 67.2042663, 9.61, 0.15]);
    asteroids.set('Edna', [59800, 3.1972566, 0.19769250, 21.30678, 81.71001, 291.98910, 208.9020844, 9.22, 0.15]);
    asteroids.set('Egeria', [59800, 2.5760403, 0.08548904, 16.53610, 80.00896, 43.20676, 114.0490332, 6.95, 0.15]);
    asteroids.set('Ekard', [60000, 2.6710940, 0.32329964, 15.89566, 111.88267, 229.96208, 22.2666147, 9.20, 0.15]);
    asteroids.set('Elektra', [59800, 3.1267188, 0.20947922, 22.78009, 237.64702, 145.00602, 159.6797333, 7.32, 0.15]);
    asteroids.set('Eleonora', [60000, 2.8012344, 0.11154290, 18.36036, 7.51913, 140.24571, 266.6074723, 6.46, 0.37]);
    asteroids.set('Eleutheria', [60000, 3.1331711, 0.08916544, 9.25536, 133.77835, 58.24488, 127.1363713, 9.18, 0.15]);
    asteroids.set('Elfriede', [60000, 3.1920910, 0.06918799, 17.05241, 229.98837, 110.83495, 195.2414834, 8.37, 0.15]);
    asteroids.set('Elisabetha', [60000, 2.7647071, 0.04129720, 13.76093, 93.08830, 106.40257, 154.8732562, 9.20, 0.15]);
    asteroids.set('Elpis', [60000, 2.7133634, 0.11717583, 8.64928, 210.84244, 169.93111, 108.1828411, 8.08, 0.15]);
    asteroids.set('Elsa', [60000, 2.4153690, 0.18710324, 2.00544, 310.69885, 107.17978, 289.7855929, 9.20, 0.15]);
    asteroids.set('Elvira', [60000, 2.8858659, 0.09262969, 1.16548, 135.88376, 230.98976, 30.9613958, 9.93, 0.15]);
    asteroids.set('Emanuela', [59800, 2.9898079, 0.19192529, 10.20114, 27.29439, 299.59403, 246.9945716, 9.41, 0.15]);
    asteroids.set('Emita', [60000, 2.7402726, 0.15807151, 9.84508, 349.22346, 66.71415, 303.2580145, 8.81, 0.15]);
    asteroids.set('Emma', [59800, 3.0503341, 0.14437630, 7.98709, 55.55622, 303.89487, 172.5697358, 8.70, 0.15]);
    asteroids.set('Eos', [60000, 3.0113841, 0.10191868, 10.89190, 192.51836, 141.73638, 160.4408795, 7.82, 0.13]);
    asteroids.set('Erato', [59800, 3.1301296, 0.16805614, 2.23658, 277.41390, 125.12295, 92.4346307, 8.83, 0.15]);
    asteroids.set('Erda', [59800, 3.1182424, 0.11038531, 12.73778, 116.73828, 190.59061, 292.8758063, 9.71, 0.15]);
    asteroids.set('Erida', [60000, 3.0561338, 0.19802835, 6.92723, 174.60947, 38.51343, 87.5243086, 9.79, 0.15]);
    asteroids.set('Erigone', [60000, 2.3657746, 0.19243451, 4.81633, 298.58105, 160.04271, 209.3509367, 9.76, -0.04]);
    asteroids.set('Erika', [59800, 2.9124878, 0.16944741, 7.92975, 298.77098, 34.56936, 257.7161503, 9.66, 0.15]);
    asteroids.set('Eriphyla', [60000, 2.8720384, 0.08775233, 3.19075, 249.41830, 105.20982, 68.5020276, 9.38, 0.15]);
    asteroids.set('Erminia', [59800, 2.9240996, 0.05094589, 25.01806, 102.37255, 2.78188, 61.6087769, 8.44, 0.15]);
    asteroids.set('Etheridgea', [60000, 3.0271850, 0.09588237, 6.03643, 334.01681, 21.85090, 177.0286116, 9.82, 0.15]);
    asteroids.set('Eucharis', [59800, 3.1265264, 0.20743359, 18.89228, 318.85451, 143.01666, 64.6780292, 7.96, 0.15]);
    asteroids.set('Eudora', [60000, 2.8658361, 0.31040871, 10.52378, 155.17283, 162.56875, 116.6923771, 9.93, 0.15]);
    asteroids.set('Euforbo', [60000, 5.1898485, 0.11982627, 18.93868, 318.69594, 113.52069, 14.7771380, 8.80, 0.15]);
    asteroids.set('Eugenia', [59800, 2.7210226, 0.08346740, 6.60539, 87.59322, 147.59452, 302.5996365, 7.67, 0.07]);
    asteroids.set('Eukrate', [59800, 2.7401043, 0.24591910, 24.95737, 55.32645, 0.05290, 193.1870569, 8.33, 0.15]);
    asteroids.set('Eunike', [60000, 2.7388983, 0.12732237, 23.25367, 223.76456, 153.76169, 129.8095939, 7.71, 0.15]);
    asteroids.set('Eunomia', [59800, 2.6435957, 0.18683945, 11.75226, 98.65743, 292.91664, 198.3294498, 5.38, 0.23]);
    asteroids.set('Euphrosyne', [59800, 3.1642679, 0.21711258, 26.30672, 61.56592, 30.80401, 297.8430070, 6.88, 0.15]);
    asteroids.set('Europa', [59800, 3.0946662, 0.11084363, 7.47818, 343.04129, 128.59312, 94.9604950, 6.57, 0.18]);
    asteroids.set('Eurydike', [59800, 2.6746922, 0.30363589, 4.99204, 339.46711, 359.32407, 232.0839674, 9.15, 0.23]);
    asteroids.set('Eurykleia', [60000, 2.8808803, 0.04141454, 6.96975, 117.11378, 6.97472, 240.2582858, 9.18, 0.15]);
    asteroids.set('Eurynome', [59800, 2.4448456, 0.19054813, 4.61357, 201.53954, 206.51867, 177.6941514, 7.97, 0.25]);
    asteroids.set('Euterpe', [60000, 2.3469915, 0.17127832, 1.58334, 356.36301, 94.76846, 359.1406366, 7.08, 0.15]);
    asteroids.set('Eva', [60000, 2.6309785, 0.34718551, 24.47702, 284.00659, 76.78953, 53.5900369, 8.80, 0.15]);
    asteroids.set('Evelyn', [60000, 2.7260334, 0.17458168, 5.00878, 41.42286, 68.83282, 265.4179691, 9.35, 0.15]);
    asteroids.set('Faina', [59800, 2.5516394, 0.15111175, 15.59507, 302.57041, 78.82570, 126.6103992, 8.75, 0.08]);
    asteroids.set('Fama', [59800, 3.1653543, 0.14576109, 9.08512, 108.57556, 297.11170, 173.8653037, 9.36, 0.15]);
    asteroids.set('Fatme', [59800, 3.1262251, 0.05245037, 8.65874, 264.11970, 91.04967, 176.3074055, 9.60, 0.15]);
    asteroids.set('Felicitas', [59800, 2.6944386, 0.29977481, 7.84583, 57.57214, 2.76208, 159.2122051, 9.04, 0.04]);
    asteroids.set('Feodosia', [60000, 2.7352764, 0.18017711, 15.81212, 184.07374, 52.69359, 111.7670276, 9.66, 0.15]);
    asteroids.set('Feronia', [60000, 2.2669221, 0.12100198, 5.41741, 103.19484, 207.93352, 50.8929108, 9.11, 0.15]);
    asteroids.set('Fidelio', [60000, 2.6350414, 0.12700822, 8.22309, 79.17572, 326.65713, 29.3767683, 9.90, 0.15]);
    asteroids.set('Fides', [60000, 2.6432133, 0.17571885, 3.07072, 62.32730, 7.26668, 303.4359516, 7.42, 0.24]);
    asteroids.set('Fiducia', [59800, 2.6789750, 0.11283308, 6.16115, 240.10034, 95.02976, 245.7478865, 9.57, 0.15]);
    asteroids.set('Fini', [59800, 2.7491617, 0.10182194, 19.05163, 189.98365, 17.35882, 19.7512359, 9.93, 0.15]);
    asteroids.set('Flammario', [60000, 2.7379508, 0.28436658, 15.85986, 286.61045, 115.41504, 43.0111801, 9.09, 0.15]);
    asteroids.set('Flora', [59800, 2.2013989, 0.15624527, 5.88879, 285.56436, 110.86748, 196.5862386, 6.60, 0.28]);
    asteroids.set('Fortuna', [59800, 2.4429025, 0.15711395, 1.57306, 182.50509, 211.03470, 146.6776074, 7.42, 0.10]);
    asteroids.set('Francette', [60000, 3.9478074, 0.18958678, 7.59250, 348.05346, 149.56150, 174.2928704, 9.64, 0.15]);
    asteroids.set('Franklina', [60000, 3.0684369, 0.23341155, 13.65027, 350.88311, 299.15974, 218.8956985, 9.98, 0.15]);
    asteroids.set('Franzia', [60000, 2.8020689, 0.08299438, 13.88763, 120.59060, 300.00020, 264.3235169, 9.83, 0.15]);
    asteroids.set('Freda', [60000, 3.1314262, 0.27051843, 25.19472, 251.24265, 55.59736, 171.9488543, 8.98, 0.15]);
    asteroids.set('Fredegundis', [60000, 2.5715167, 0.22029021, 6.09556, 121.22550, 281.09437, 285.9887714, 9.30, 0.15]);
    asteroids.set('Freia', [59800, 3.4134171, 0.16646304, 2.12240, 252.06122, 204.27679, 111.9116286, 8.06, 0.15]);
    asteroids.set('Friederike', [60000, 3.1572435, 0.17122665, 6.52165, 227.50042, 141.16457, 337.0469478, 9.61, 0.15]);
    asteroids.set('Frigga', [59800, 2.6677372, 0.13321803, 2.42288, 61.65192, 1.13569, 194.8502670, 8.68, 0.16]);
    asteroids.set('Fringilla', [60000, 2.9138476, 0.11330759, 16.26373, 19.66221, 324.37154, 329.6197481, 9.13, 0.15]);
    asteroids.set('Galatea', [59800, 2.7816873, 0.23622063, 4.07147, 174.69171, 197.11855, 169.5196061, 8.83, 0.15]);
    asteroids.set('Galilea', [60000, 2.8829295, 0.15388699, 15.12299, 333.21517, 15.41373, 186.4026421, 9.51, 0.15]);
    asteroids.set('Gallia', [59800, 2.7697041, 0.18801968, 25.29452, 252.66222, 145.00175, 260.5978568, 7.65, 0.15]);
    asteroids.set('Ganymed', [59800, 2.6659416, 0.53310212, 26.68199, 132.45132, 215.50500, 185.9078515, 9.21, 0.30]);
    asteroids.set('Gaussia', [60000, 3.2110482, 0.12229759, 9.31468, 145.93185, 259.11653, 99.8284279, 9.78, 0.15]);
    asteroids.set('Gedania', [60000, 3.1928242, 0.09267235, 10.00027, 158.73134, 258.76122, 53.1770555, 9.75, 0.15]);
    asteroids.set('Genoveva', [60000, 3.1429905, 0.29606525, 17.52318, 245.76103, 37.95120, 87.5505041, 9.51, 0.15]);
    asteroids.set('Genua', [60000, 2.7522561, 0.19059290, 13.87180, 271.89875, 193.39465, 277.7329012, 8.30, 0.15]);
    asteroids.set('Geometria', [60000, 2.2878303, 0.17275955, 5.43097, 316.66001, 301.96356, 226.5972329, 9.53, 0.15]);
    asteroids.set('Georgia', [60000, 2.7279972, 0.15672306, 6.77443, 337.91717, 6.00386, 129.6215534, 9.36, 0.15]);
    asteroids.set('Geraldina', [60000, 3.2120791, 0.05953311, 0.73021, 322.05606, 42.83101, 8.2658293, 9.82, 0.15]);
    asteroids.set('Gerda', [60000, 3.2279104, 0.02911237, 1.64217, 320.55310, 178.08872, 213.3159831, 7.75, 0.15]);
    asteroids.set('GENERIC', [0, 0, 0, 0, 0, 0, 0, 0, 0]);
    asteroids.set('Gerlinde', [60000, 3.0717152, 0.14614860, 17.89470, 313.44213, 232.31070, 213.4150220, 9.21, 0.15]);
    asteroids.set('Germania', [60000, 3.0502470, 0.10466095, 5.50339, 80.42382, 270.29349, 2.5655699, 7.82, 0.15]);
    asteroids.set('Gersuind', [60000, 2.5882981, 0.26840541, 15.69088, 89.05764, 243.01615, 83.6971740, 9.65, 0.15]);
    asteroids.set('Ginevra', [60000, 2.9207386, 0.05638629, 7.67055, 66.05394, 354.51946, 85.0145219, 9.68, 0.15]);
    asteroids.set('Glauke', [60000, 2.7606079, 0.20581746, 4.33780, 84.43277, 120.10607, 332.4400738, 9.86, 0.15]);
    asteroids.set('Gonnessia', [60000, 3.3462504, 0.03435686, 15.01611, 255.00140, 251.73408, 292.7630174, 9.34, 0.15]);
    asteroids.set('Gordonia', [59800, 3.0900934, 0.19615801, 4.45034, 260.65344, 207.45743, 82.8745602, 8.89, 0.15]);
    asteroids.set('Gratia', [59800, 2.7743801, 0.10901031, 8.22096, 333.83878, 99.14251, 97.3513712, 9.63, 0.15]);
    asteroids.set('Gretia', [59800, 2.8040885, 0.19557150, 9.09640, 55.08659, 314.16481, 83.6532443, 9.55, 0.15]);
    asteroids.set('Gudrun', [60000, 3.1082932, 0.10732817, 16.13495, 107.26467, 351.89143, 33.3328638, 8.86, 0.15]);
    asteroids.set('Gunila', [59800, 3.1601666, 0.09116273, 14.86633, 348.52295, 250.66536, 349.5505091, 9.53, 0.15]);
    asteroids.set('Gutemberga', [60000, 3.2160136, 0.11612574, 12.90381, 264.85483, 282.97476, 249.0705871, 9.80, 0.15]);
    asteroids.set('Gyptis', [60000, 2.7714035, 0.17408740, 10.27397, 154.69332, 195.60454, 165.3400338, 8.07, 0.22]);
    asteroids.set('Hamburga', [60000, 2.5504921, 0.17299489, 3.07918, 48.73157, 85.77089, 350.9016350, 9.82, 0.15]);
    asteroids.set('Hansa', [60000, 2.6452989, 0.04583674, 21.30905, 212.34375, 237.13288, 277.6927959, 8.29, 0.15]);
    asteroids.set('Hanskya', [59800, 3.2134914, 0.04345574, 13.95265, 337.19233, 318.71042, 252.5241238, 9.90, 0.15]);
    asteroids.set('Happelia', [59800, 2.7509465, 0.19200257, 6.14952, 261.50950, 29.36920, 315.5114982, 9.52, 0.15]);
    asteroids.set('Harmonia', [60000, 2.2674027, 0.04628187, 4.25553, 268.95063, 94.16356, 152.5104796, 7.27, 0.15]);
    asteroids.set('Havnia', [60000, 2.5779136, 0.04468193, 8.06443, 31.39351, 27.30944, 251.9780402, 9.18, 0.15]);
    asteroids.set('Hebe', [60000, 2.4252405, 0.20275238, 14.73756, 239.54004, 138.63827, 91.8652829, 5.59, 0.24]);
    asteroids.set('Hecuba', [60000, 3.2370917, 0.06154512, 4.21114, 211.86754, 349.81155, 204.7115756, 8.02, 0.15]);
    asteroids.set('Hedwig', [60000, 2.6509963, 0.07419140, 10.91880, 1.29281, 286.21592, 104.5398265, 8.66, 0.15]);
    asteroids.set('Heidelberga', [60000, 3.2153583, 0.15128242, 8.57469, 70.73782, 344.21045, 55.5505518, 8.76, 0.15]);
    asteroids.set('Hekate', [60000, 3.0873475, 0.16872129, 6.43294, 183.78111, 127.17145, 141.4448733, 7.71, 0.15]);
    asteroids.set('Hel', [60000, 3.0027674, 0.19776756, 10.63504, 250.75885, 320.82188, 186.0312264, 9.84, 0.15]);
    asteroids.set('Helena', [59800, 2.5838317, 0.14131547, 10.19591, 348.12000, 343.38059, 38.3407040, 8.25, 0.35]);
    asteroids.set('Helga', [59800, 3.6280206, 0.08670411, 4.41928, 248.85872, 116.56649, 151.9218962, 9.09, 0.15]);
    asteroids.set('Helio', [60000, 3.2063254, 0.14402690, 26.05478, 177.19259, 264.61384, 295.0452735, 8.38, 0.15]);
    asteroids.set('Henrietta', [60000, 3.3938344, 0.26248294, 20.85274, 103.85419, 197.03133, 178.3434855, 8.86, 0.15]);
    asteroids.set('Hera', [59800, 2.7023749, 0.07923673, 5.41848, 189.18457, 136.07347, 260.6136180, 7.72, 0.15]);
    asteroids.set('Herculina', [60000, 2.7692749, 0.17950118, 16.29863, 76.73384, 107.42055, 282.6495160, 5.89, 0.26]);
    asteroids.set('Hercynia', [59800, 2.9933280, 0.24265681, 12.65382, 277.15210, 134.12858, 160.5760057, 9.69, 0.15]);
    asteroids.set('Hermentaria', [60000, 2.7966738, 0.10322179, 8.75068, 291.58786, 91.91078, 335.2271652, 7.42, 0.15]);
    asteroids.set('Hermione', [60000, 3.4529548, 0.12580692, 7.56729, 296.84996, 72.87881, 74.6372444, 7.46, 0.15]);
    asteroids.set('Herodias', [60000, 2.5967906, 0.11550069, 14.86947, 110.25817, 21.58650, 352.8780220, 9.80, 0.15]);
    asteroids.set('Hersilia', [59800, 2.7411975, 0.03935342, 3.77980, 302.67940, 145.03864, 103.8484500, 8.84, 0.15]);
    asteroids.set('Hertha', [59800, 2.4281414, 0.20695436, 2.30374, 340.36461, 343.56216, 290.3762945, 8.26, 0.15]);
    asteroids.set('Hesperia', [60000, 2.9749819, 0.17011394, 8.59314, 288.79969, 184.98580, 210.2874694, 7.25, 0.19]);
    asteroids.set('Hestia', [59800, 2.5260564, 0.17300298, 2.35136, 177.21575, 181.06395, 4.8508779, 8.59, 0.06]);
    asteroids.set('Hiera', [60000, 5.1271947, 0.10358005, 19.34285, 123.74759, 285.46874, 16.2529880, 9.82, 0.15]);
    asteroids.set('Hilda', [59800, 3.9755327, 0.13972257, 7.82772, 39.40648, 228.08898, 323.9944563, 7.67, 0.15]);
    asteroids.set('Hildrun', [60000, 3.1361975, 0.14686308, 17.64421, 21.83360, 129.83099, 187.0063604, 9.97, 0.15]);
    asteroids.set('Hippo', [59800, 2.8884132, 0.10586030, 19.49852, 221.70406, 311.32763, 330.0884268, 8.62, 0.15]);
    asteroids.set('Hippodamia', [60000, 3.3822282, 0.16894467, 26.08459, 53.63991, 63.45892, 167.7729342, 8.99, 0.15]);
    asteroids.set('Hispania', [59800, 2.8394778, 0.14171306, 15.39761, 344.61614, 347.58918, 11.0806932, 8.00, 0.18]);
    asteroids.set('Hohensteina', [60000, 3.1209237, 0.13583968, 14.35854, 47.68565, 177.68107, 241.7056043, 8.74, 0.15]);
    asteroids.set('Holmia', [60000, 2.7774334, 0.13072367, 7.01079, 156.79554, 232.35290, 4.4276813, 9.88, 0.15]);
    asteroids.set('Honoria', [60000, 2.7974621, 0.19058090, 7.70032, 174.24278, 185.80412, 80.6401640, 8.29, -0.02]);
    asteroids.set('Hormuthia', [60000, 3.1940154, 0.18607367, 15.73072, 131.84267, 166.34437, 187.6928255, 9.89, 0.15]);
    asteroids.set('Huberta', [60000, 3.4487285, 0.10794099, 6.42012, 180.11316, 164.94422, 121.0634096, 9.22, 0.15]);
    asteroids.set('Huenna', [60000, 3.1434544, 0.17975772, 1.67071, 180.84230, 171.85835, 189.8462925, 9.03, 0.15]);
    asteroids.set('Hygiea', [59800, 3.1409795, 0.11137826, 3.83122, 312.51775, 283.17595, 4.2803247, 5.60, 0.15]);
    asteroids.set('Hypatia', [59800, 2.9049307, 0.09063319, 12.41542, 210.60695, 183.86782, 247.7476429, 8.11, 0.15]);
    asteroids.set('Ianthe', [59800, 2.6877126, 0.18745598, 15.57646, 158.45786, 353.89909, 34.4483913, 8.95, 0.15]);
    asteroids.set('Iclea', [60000, 3.1923716, 0.02403111, 17.94264, 210.08917, 148.93299, 107.0743823, 9.10, 0.15]);
    asteroids.set('Ida', [59800, 2.8619045, 0.04397067, 1.12977, 113.84129, 323.62247, 123.9277453, 9.98, 0.15]);
    asteroids.set('Iduna', [59800, 3.1816178, 0.17158982, 22.67885, 188.62308, 200.46895, 186.6170568, 8.34, 0.15]);
    asteroids.set('Ilioneus', [60000, 5.1948327, 0.01217248, 15.75244, 108.98111, 242.52856, 300.1327603, 9.89, 0.15]);
    asteroids.set('Ilmatar', [60000, 2.8464807, 0.12617736, 13.58276, 189.17161, 344.85449, 296.9560067, 7.61, 0.15]);
    asteroids.set('Ilsewa', [59800, 3.1563323, 0.13850089, 10.11435, 115.69164, 230.58173, 263.6918227, 9.81, 0.15]);
    asteroids.set('Industria', [60000, 2.6109366, 0.06568076, 8.11264, 266.31111, 282.14466, 189.2079228, 7.94, 0.15]);
    asteroids.set('Ino', [60000, 2.7422916, 0.20995083, 14.19846, 228.79355, 148.17199, 338.0102861, 8.01, 0.01]);
    asteroids.set('Interamnia', [60000, 3.0596294, 0.15616248, 17.30030, 94.54692, 280.22715, 359.2816584, 6.29, -0.02]);
    asteroids.set('Io', [60000, 2.6532333, 0.19382473, 11.96131, 122.90072, 203.05145, 180.2829619, 7.84, 0.15]);
    asteroids.set('Iolanda', [60000, 3.0629573, 0.09692308, 15.41455, 157.27012, 217.51091, 331.8397514, 8.45, 0.15]);
    asteroids.set('Iphigenia', [59800, 2.4343578, 0.12874326, 2.59809, 17.17326, 323.40119, 20.5808828, 9.83, 0.15]);
    asteroids.set('Iphthime', [59800, 5.1798380, 0.07060026, 15.03702, 137.24209, 241.52963, 33.1422576, 9.99, 0.15]);
    asteroids.set('Irene', [59800, 2.5857516, 0.16575673, 9.12089, 97.70864, 86.11579, 89.4593858, 6.55, 0.15]);
    asteroids.set('Iris', [59800, 2.3868952, 0.22957973, 5.51736, 145.37724, 259.51634, 101.0671304, 5.62, 0.15]);
    asteroids.set('Irma', [59800, 2.7721250, 0.23407131, 1.38188, 39.46221, 346.97709, 151.0937988, 9.72, 0.15]);
    asteroids.set('Irmintraud', [59800, 2.8581413, 0.07848469, 16.66652, 333.05184, 322.29435, 307.6605424, 9.13, 0.15]);
    asteroids.set('Isabella', [60000, 2.7228486, 0.12438558, 5.26110, 14.24386, 32.55756, 321.0648837, 9.42, 0.15]);
    asteroids.set('Isara', [59800, 2.2208639, 0.14884664, 6.00415, 313.13130, 105.52001, 137.9220489, 9.81, 0.15]);
    asteroids.set('Isis', [60000, 2.4427581, 0.22236128, 8.51059, 237.23707, 84.17653, 205.0847716, 7.62, 0.15]);
    asteroids.set('Ismene', [60000, 3.9931567, 0.16800667, 6.17636, 271.12617, 175.43811, 72.4685194, 7.71, 0.15]);
    asteroids.set('Isolda', [60000, 3.0467790, 0.15514499, 3.87308, 173.36202, 263.17644, 345.9626074, 8.04, 0.12]);
    asteroids.set('Istria', [60000, 2.7946252, 0.34842958, 26.39590, 263.99536, 141.87583, 81.8892421, 9.54, 0.15]);
    asteroids.set('Iva', [60000, 2.8509779, 0.30159374, 4.82187, 3.42862, 6.30977, 13.8300621, 9.92, 0.11]);
    asteroids.set('Janina', [59800, 3.1399570, 0.16823823, 2.65918, 324.57886, 92.77344, 103.7810158, 9.98, 0.15]);
    asteroids.set('Jenny', [60000, 2.8518877, 0.07680977, 10.08960, 292.29808, 284.99684, 205.2534719, 9.96, 0.15]);
    asteroids.set('Johanna', [60000, 2.7562946, 0.06576851, 8.24588, 92.79753, 31.12891, 226.9361054, 8.58, 0.15]);
    asteroids.set('Josephina', [60000, 3.1223401, 0.05647679, 6.88704, 67.41069, 343.64750, 62.4407694, 8.96, 0.15]);
    asteroids.set('Judith', [60000, 3.2003415, 0.23299684, 8.57716, 102.74387, 170.89864, 81.4362317, 9.97, 0.15]);
    asteroids.set('Juewa', [60000, 2.7894108, 0.17131961, 10.90160, 166.31847, 1.80118, 209.1091691, 8.05, 0.15]);
    asteroids.set('Jugurtha', [60000, 2.7226185, 0.01468247, 9.13780, 339.31871, 79.22259, 346.7938970, 9.92, 0.15]);
    asteroids.set('Julia', [60000, 2.5503344, 0.18447525, 16.12605, 45.09498, 311.54618, 116.5898342, 6.76, 0.15]);
    asteroids.set('Juno', [60000, 2.6701368, 0.25646772, 12.99066, 247.73654, 169.84301, 351.8241172, 5.14, 0.32]);
    asteroids.set('Justitia', [60000, 2.6171851, 0.21316138, 5.47792, 119.84713, 156.71203, 58.2765378, 9.79, 0.15]);
    asteroids.set('Kalliope', [59800, 2.9107746, 0.09852993, 13.69969, 357.67941, 65.98689, 73.1034374, 6.66, 0.21]);
    asteroids.set('Kallisto', [60000, 2.6707542, 0.17362115, 8.28715, 55.50676, 205.08027, 52.3709736, 8.93, 0.15]);
    asteroids.set('Kalypso', [60000, 2.6187021, 0.20250399, 5.18101, 314.21233, 143.45802, 28.7959970, 8.90, 0.15]);
    asteroids.set('Kapteynia', [60000, 3.1702634, 0.09049439, 15.63177, 291.65632, 70.67348, 98.8963416, 9.32, 0.15]);
    asteroids.set('Kartvelia', [60000, 3.2157901, 0.11935311, 19.13844, 154.66835, 138.01026, 113.4421104, 9.54, 0.15]);
    asteroids.set('Kassandra', [59800, 2.6761360, 0.13812065, 4.94474, 352.69654, 164.06641, 331.5175473, 8.36, 0.15]);
    asteroids.set('Katja', [60000, 3.1161574, 0.13479687, 13.25468, 119.31764, 324.39639, 340.3738169, 9.30, 0.15]);
    asteroids.set('Kleopatra', [59800, 2.7945945, 0.25148250, 13.11632, 179.79321, 215.32363, 324.4277449, 7.08, 0.29]);
    asteroids.set('Klio', [60000, 2.3620587, 0.23612322, 9.31629, 15.04783, 327.51488, 127.5314501, 9.39, 0.15]);
    asteroids.set('Klotho', [60000, 2.6673228, 0.25795541, 11.77962, 268.54202, 159.62005, 267.7697536, 7.85, 0.15]);
    asteroids.set('Klotilde', [60000, 3.1705071, 0.15989858, 8.24521, 251.90420, 257.84334, 147.9328259, 9.30, 0.15]);
    asteroids.set('Klymene', [59800, 3.1463722, 0.16152730, 2.78983, 31.66115, 41.65959, 130.3947142, 8.50, 0.15]);
    asteroids.set('Klytaemnestra', [59800, 2.9737334, 0.11005773, 7.81567, 104.14322, 251.85140, 141.4684634, 8.18, 0.15]);
    asteroids.set('Klytia', [59800, 2.6646600, 0.04190573, 2.37013, 55.59407, 6.85162, 65.4043775, 9.04, 0.15]);
    asteroids.set('Kolga', [60000, 2.8948414, 0.08766348, 11.52400, 226.25036, 159.19032, 87.2505837, 9.03, 0.15]);
    asteroids.set('Kordula', [59800, 3.3686025, 0.16999761, 6.24051, 283.83226, 66.29516, 168.6018206, 9.32, 0.15]);
    asteroids.set('Koronis', [59800, 2.8695886, 0.05276205, 1.00506, 146.71322, 277.69115, 97.2681438, 9.24, 0.15]);
    asteroids.set('Kreusa', [60000, 3.1728219, 0.15818184, 11.46036, 76.33726, 83.02771, 251.8593524, 7.92, 0.15]);
    asteroids.set('Kriemhild', [59800, 2.8619155, 0.12196135, 11.35170, 279.03621, 206.89235, 79.5127856, 9.45, 0.15]);
    asteroids.set('Kythera', [60000, 3.4219733, 0.11880155, 1.81650, 161.95835, 223.29826, 132.7373519, 8.83, 0.15]);
    asteroids.set('Lacadiera', [59800, 2.2518304, 0.09544808, 5.65141, 30.98462, 234.99316, 246.1129074, 9.86, 0.15]);
    asteroids.set('Lachesis', [60000, 3.1200583, 0.05105647, 6.96088, 235.35333, 341.17069, 123.2257527, 7.79, 0.15]);
    asteroids.set('Lacrimosa', [60000, 2.8914148, 0.01068523, 1.74476, 128.26882, 4.15135, 310.3847285, 9.20, 0.15]);
    asteroids.set('Laetitia', [59800, 2.7698060, 0.11186517, 10.37075, 209.60250, 156.93933, 197.6885108, 6.26, 0.15]);
    asteroids.set('Lamberta', [59800, 2.7287637, 0.24068057, 10.58227, 196.72678, 21.67329, 339.0059712, 8.30, 0.15]);
    asteroids.set('Lampetia', [59800, 2.7804011, 0.33013713, 14.87616, 90.84409, 212.39363, 281.0964570, 8.44, 0.15]);
    asteroids.set('Lanzia', [60000, 3.1155647, 0.05843132, 18.52419, 280.64860, 259.65038, 352.3162338, 8.74, 0.15]);
    asteroids.set('Laodica', [59800, 3.1523757, 0.10157820, 9.49844, 100.48713, 293.40893, 216.6109499, 9.27, 0.15]);
    asteroids.set('Larissa', [60000, 3.9262018, 0.10530959, 1.87475, 206.56021, 39.65573, 211.2428045, 9.60, 0.15]);
    asteroids.set('Latona', [60000, 3.0159020, 0.10803387, 8.55535, 70.89257, 279.81504, 345.1789311, 8.34, 0.15]);
    asteroids.set('Laurentia', [59800, 3.0162150, 0.18202645, 6.09143, 115.74279, 35.44786, 354.4696014, 8.97, 0.15]);
    asteroids.set('Leda', [60000, 2.7428328, 0.15130723, 6.94974, 169.38443, 295.53186, 309.0432390, 8.52, 0.15]);
    asteroids.set('Lehigh', [59800, 3.0091158, 0.12395056, 13.01512, 304.29393, 87.96214, 244.5905520, 9.30, 0.15]);
    asteroids.set('Leonora', [60000, 3.1739186, 0.24905400, 13.01630, 103.36587, 299.43152, 7.3960819, 9.52, 0.15]);
    asteroids.set('Leontina', [59800, 3.2039306, 0.06960284, 8.77721, 353.76557, 348.67616, 229.0693264, 9.73, 0.15]);
    asteroids.set('Leopoldina', [60000, 3.0518809, 0.14630097, 17.03802, 222.66654, 144.92167, 116.5481224, 9.70, 0.15]);
    asteroids.set('Letaba', [60000, 2.8633718, 0.15663722, 24.97317, 31.43958, 234.94614, 158.8145993, 9.65, 0.15]);
    asteroids.set('Leto', [59800, 2.7834155, 0.18491525, 7.96065, 304.67390, 44.06073, 156.1945392, 7.07, 0.05]);
    asteroids.set('Leukothea', [60000, 2.9963506, 0.22426603, 7.93027, 213.75970, 353.72277, 121.2649440, 8.72, 0.15]);
    asteroids.set('Liberatrix', [60000, 2.7453055, 0.07993996, 4.66575, 110.33669, 168.96949, 107.2264696, 9.01, 0.33]);
    asteroids.set('Libussa', [60000, 2.7972060, 0.13586142, 10.42743, 339.82834, 49.49108, 41.5606598, 8.37, 0.15]);
    asteroids.set('Libya', [60000, 3.9822528, 0.10335329, 4.42532, 118.60341, 350.98863, 47.0268272, 9.12, 0.15]);
    asteroids.set('Lictoria', [60000, 3.1897820, 0.12182126, 7.06533, 350.31830, 110.78689, 265.8341306, 9.58, 0.15]);
    asteroids.set('Liguria', [59800, 2.7555180, 0.24111762, 8.20497, 79.34682, 354.50400, 141.8418812, 8.43, 0.15]);
    asteroids.set('Lilaea', [59800, 2.7532115, 0.14429276, 6.80086, 162.45718, 122.02121, 313.9899928, 9.01, 0.15]);
    asteroids.set('Lilliana', [59800, 3.1976289, 0.14786855, 20.34744, 4.23588, 208.04725, 301.7312700, 9.98, 0.15]);
    asteroids.set('Lina', [60000, 3.1330200, 0.19599124, 0.43631, 332.26412, 21.49633, 96.0189179, 9.77, 0.15]);
    asteroids.set('Linzia', [60000, 3.1223121, 0.06171487, 13.42448, 206.38177, 188.69338, 50.4778691, 9.94, 0.15]);
    asteroids.set('Liriope', [59800, 3.5064042, 0.07342283, 9.55634, 318.34221, 110.55364, 151.2289221, 9.62, 0.15]);
    asteroids.set('Ljuba', [59800, 3.0047736, 0.07069650, 5.59566, 100.46956, 341.37586, 162.3689160, 9.87, 0.15]);
    asteroids.set('Lomia', [60000, 2.9894668, 0.02349835, 14.92723, 51.57083, 348.63351, 55.5235272, 8.09, 0.15]);
    asteroids.set('Loreley', [60000, 3.1245926, 0.08399513, 11.23611, 345.00076, 302.45286, 196.4227163, 7.80, 0.15]);
    asteroids.set('Lucia', [60000, 3.1411455, 0.13081550, 2.14905, 181.83227, 80.12339, 53.0520596, 9.70, 0.15]);
    asteroids.set('Lucina', [59800, 2.7188154, 0.06636710, 13.09754, 145.50792, 83.93593, 323.4215396, 8.42, 0.11]);
    asteroids.set('Ludmilla', [59800, 2.7676447, 0.20458635, 9.80673, 152.63350, 263.00284, 209.2544407, 8.13, 0.15]);
    asteroids.set('Ludovica', [59800, 2.5302110, 0.03291178, 14.88581, 286.29826, 43.47527, 206.4395510, 9.95, 0.15]);
    asteroids.set('Luisa', [60000, 2.7731020, 0.29308017, 16.71530, 294.36694, 44.13970, 24.2572186, 8.80, 0.15]);
    asteroids.set('Lumen', [60000, 2.6663192, 0.21354429, 11.89722, 57.73934, 318.47312, 116.4707160, 8.46, 0.15]);
    asteroids.set('Luscinia', [60000, 3.4008138, 0.15516870, 10.34209, 138.59777, 217.45870, 149.8404806, 9.03, 0.15]);
    asteroids.set('Lutetia', [59800, 2.4346918, 0.16357590, 3.06381, 250.22886, 80.85126, 295.1897120, 7.52, 0.11]);
    asteroids.set('Luthera', [60000, 3.2323795, 0.10209510, 19.48368, 101.11733, 71.95893, 177.1715677, 9.49, 0.15]);
    asteroids.set('Lydia', [60000, 2.7324898, 0.07992380, 5.95981, 282.18448, 56.77409, 153.4308924, 7.90, 0.20]);
    asteroids.set('Lydina', [60000, 3.4102267, 0.10469387, 9.39087, 23.41871, 62.77083, 270.4326212, 9.38, 0.15]);
    asteroids.set('Mabella', [60000, 2.6095182, 0.19153192, 9.54355, 90.92124, 202.66769, 110.8447404, 9.79, 0.15]);
    asteroids.set('Magdalena', [60000, 3.1919307, 0.08498601, 10.65794, 295.42197, 161.49133, 214.2510617, 9.51, 0.15]);
    asteroids.set('Maja', [60000, 2.6471755, 0.17312230, 3.04517, 43.38645, 7.49933, 340.3404229, 9.55, 0.15]);
    asteroids.set('Malabar', [59800, 2.9880511, 0.05073214, 24.54436, 303.09072, 179.91568, 25.9236080, 9.25, 0.15]);
    asteroids.set('Mancunia', [60000, 3.1952191, 0.15011402, 5.60428, 313.59548, 106.12332, 317.7775638, 8.46, 0.15]);
    asteroids.set('Mandeville', [59800, 2.7377692, 0.14337188, 20.66041, 44.94682, 136.54729, 36.0261823, 8.72, 0.15]);
    asteroids.set('Marghanna', [59800, 2.7307820, 0.32092038, 16.86515, 309.90130, 42.92674, 161.3995073, 9.84, 0.15]);
    asteroids.set('Margo', [60000, 3.2189081, 0.07077588, 16.32755, 101.13121, 236.99064, 44.9275569, 9.97, 0.15]);
    asteroids.set('Maria', [60000, 2.5546343, 0.06173270, 14.35970, 158.02227, 301.21063, 308.9580341, 9.34, 0.15]);
    asteroids.set('Marianna', [59800, 3.0815926, 0.25126783, 15.11212, 45.85346, 331.47657, 276.2070332, 8.52, 0.15]);
    asteroids.set('Marion', [60000, 3.0426426, 0.14620362, 16.99061, 145.30393, 312.92617, 265.3838562, 8.92, 0.15]);
    asteroids.set('Maritima', [60000, 3.1281474, 0.17897303, 18.31400, 91.34710, 33.43218, 346.5097410, 9.30, 0.15]);
    asteroids.set('Marlu', [60000, 3.1125597, 0.23611254, 17.47883, 306.99543, 1.91769, 239.7203154, 9.86, 0.15]);
    asteroids.set('Martha', [60000, 2.7799724, 0.03720490, 10.70427, 173.62264, 211.72283, 353.1534320, 9.50, 0.15]);
    asteroids.set('Mashona', [60000, 3.3879971, 0.12743912, 21.90062, 350.48331, 326.32274, 210.8654098, 8.72, 0.15]);
    asteroids.set('Massalia', [59800, 2.4088515, 0.14315299, 0.70897, 257.54954, 205.96305, 73.2489869, 6.59, 0.25]);
    asteroids.set('Massinga', [59800, 3.1478438, 0.23365925, 12.53926, 200.38349, 331.55013, 318.2704686, 7.96, 0.15]);
    asteroids.set('Mathesis', [60000, 2.6271272, 0.11147360, 6.29277, 177.29310, 32.16948, 293.4631815, 9.34, 0.15]);
    asteroids.set('May', [59800, 2.9696550, 0.07120192, 9.75683, 13.50698, 89.90277, 85.4603877, 9.45, 0.15]);
    asteroids.set('Medea', [60000, 3.1172296, 0.10290938, 4.27765, 105.31621, 312.92503, 93.6213200, 8.42, 0.15]);
    asteroids.set('Medesicaste', [60000, 5.1125629, 0.05077964, 18.65705, 344.44635, 1.59947, 335.5544264, 9.85, 0.15]);
    asteroids.set('Megaira', [60000, 2.8015720, 0.20471618, 10.16338, 257.92118, 102.34111, 103.8516174, 9.79, 0.15]);
    asteroids.set('Melete', [60000, 2.5968662, 0.23750694, 8.08190, 104.94752, 192.94054, 216.5307371, 8.57, 0.15]);
    asteroids.set('Meliboea', [59800, 3.1254330, 0.21159682, 13.43058, 107.56998, 202.17343, 252.9976767, 8.23, 0.15]);
    asteroids.set('Melitta', [59800, 3.0629538, 0.12204258, 12.84060, 185.00792, 150.23183, 253.3870944, 9.53, 0.15]);
    asteroids.set('Melpomene', [59800, 2.2953745, 0.21808272, 10.13247, 228.15035, 150.36068, 247.0182408, 6.57, 0.25]);
    asteroids.set('Melusina', [59800, 3.1220383, 0.13791937, 15.37887, 348.99225, 3.63199, 159.6076990, 9.17, 0.15]);
    asteroids.set('Menestheus', [60000, 5.1387488, 0.07507092, 17.57078, 317.09720, 177.66155, 294.6910138, 9.68, 0.15]);
    asteroids.set('Menippe', [60000, 2.7603899, 0.17930773, 11.70362, 69.83205, 240.82578, 142.5864565, 9.35, 0.15]);
    asteroids.set('Mentor', [60000, 5.1728651, 0.07489217, 24.63862, 131.43504, 179.55814, 28.6756405, 8.49, 0.15]);
    asteroids.set('Merapi', [60000, 3.4945646, 0.08754262, 19.43296, 296.03962, 59.19875, 303.6733256, 8.14, 0.15]);
    asteroids.set('Meriones', [59800, 5.1796885, 0.07479044, 23.51940, 66.29686, 356.68090, 14.8263758, 9.20, 0.15]);
    asteroids.set('Merxia', [59800, 2.7447467, 0.12939228, 4.72273, 274.54351, 180.98542, 127.4840643, 9.83, 0.15]);
    asteroids.set('Messalina', [60000, 3.1994670, 0.16982220, 11.20641, 331.31427, 333.59406, 357.5859774, 8.85, 0.15]);
    asteroids.set('Metis', [59800, 2.3855300, 0.12353618, 5.57676, 6.09153, 68.89798, 238.1576687, 6.32, 0.17]);
    asteroids.set('Meyer', [59800, 3.5413252, 0.03419244, 14.47342, 259.88004, 245.60867, 45.7527800, 9.91, 0.15]);
    asteroids.set('Minerva', [60000, 2.7566218, 0.13931346, 8.55772, 275.38013, 4.02573, 58.1678955, 7.96, 0.15]);
    asteroids.set('Miriam', [59800, 2.6632501, 0.25104813, 5.17320, 147.19846, 210.77007, 163.2936813, 9.41, 0.15]);
    asteroids.set('Mnemosyne', [60000, 3.1529178, 0.10868157, 15.23672, 210.56562, 198.89723, 29.6470377, 7.03, 0.15]);
    asteroids.set('Mocia', [59800, 3.3993782, 0.05811111, 20.28748, 189.08731, 340.97415, 45.3898701, 9.22, 0.15]);
    asteroids.set('Moguntia', [60000, 3.0177054, 0.09711195, 10.09058, 70.62309, 7.82237, 246.6008176, 9.92, 0.15]);
    asteroids.set('Montague', [60000, 2.5695163, 0.02565249, 6.77262, 68.03857, 84.76132, 16.0148161, 9.45, 0.15]);
    asteroids.set('Monterosa', [59800, 2.7538937, 0.24740650, 6.69639, 339.26622, 48.25855, 174.5442695, 9.99, 0.15]);
    asteroids.set('Moskva', [59800, 2.5393345, 0.12966038, 14.85250, 125.81847, 183.82219, 194.9707753, 9.73, 0.15]);
    asteroids.set('Muschi', [59800, 2.7185040, 0.13035679, 14.41219, 178.04394, 72.39539, 339.7543108, 9.94, 0.15]);
    asteroids.set('Myrrha', [59800, 3.2220533, 0.08971462, 12.55890, 144.10438, 125.07009, 4.0677605, 8.44, 0.15]);
    asteroids.set('Nanon', [60000, 2.7123991, 0.06513767, 9.29913, 129.57718, 112.04710, 98.0979168, 9.59, 0.15]);
    asteroids.set('Nassovia', [59800, 2.8826152, 0.05940069, 3.27520, 338.28345, 94.08079, 186.8310327, 9.74, 0.15]);
    asteroids.set('Nata', [60000, 3.1625386, 0.05320964, 8.35670, 156.96331, 313.21610, 228.8127336, 9.61, 0.15]);
    asteroids.set('Nausikaa', [60000, 2.4031741, 0.24607435, 6.79814, 30.60541, 343.09889, 8.6952897, 7.38, 0.03]);
    asteroids.set('Nemausa', [59800, 2.3652141, 0.06746466, 9.97936, 1.79711, 175.95573, 61.9594676, 7.66, 0.08]);
    asteroids.set('Nemesis', [59800, 2.7509232, 0.12832515, 6.24371, 303.20108, 76.20414, 332.0724978, 7.77, 0.15]);
    asteroids.set('Nenetta', [59800, 2.8765274, 0.20176447, 6.68078, 190.58410, 181.92759, 187.1855310, 9.59, 0.15]);
    asteroids.set('Neoptolemus', [60000, 5.1995187, 0.04525997, 17.77478, 322.08172, 86.58003, 31.1728495, 9.41, 0.15]);
    asteroids.set('Nephele', [59800, 3.1392699, 0.17067236, 1.82786, 217.28075, 117.18590, 259.0666954, 9.02, 0.15]);
    asteroids.set('Nephthys', [60000, 2.3527224, 0.02257255, 10.03527, 120.37015, 142.31765, 61.8279838, 8.34, 0.22]);
    asteroids.set('Nerthus', [59800, 3.1326378, 0.10433940, 16.14953, 160.61147, 169.54503, 295.3029845, 9.70, 0.15]);
    asteroids.set('Nestor', [60000, 5.1681893, 0.11669017, 4.52246, 344.06587, 350.74309, 98.3686902, 8.71, 0.15]);
    asteroids.set('Nina', [60000, 2.6645335, 0.22702481, 14.57412, 49.08413, 283.72462, 168.2042295, 8.06, 0.15]);
    asteroids.set('Ninina', [59800, 3.1515078, 0.07742214, 15.05420, 255.57579, 137.63896, 170.6050996, 8.90, 0.15]);
    asteroids.set('Niobe', [60000, 2.7540371, 0.17626090, 23.24201, 267.08247, 315.92591, 205.4281484, 7.25, 0.40]);
    asteroids.set('Nipponia', [60000, 2.5668879, 0.10389351, 15.05809, 274.36235, 133.03954, 66.5616590, 9.62, 0.15]);
    asteroids.set('Normannia', [59800, 3.8947486, 0.07959101, 4.17419, 101.79679, 236.87192, 235.3875673, 9.77, 0.15]);
    asteroids.set('Notburga', [59800, 2.5743319, 0.24189413, 25.37931, 43.46171, 341.59128, 82.5442908, 9.19, 0.15]);
    asteroids.set('Nuwa', [59800, 2.9848985, 0.12369781, 2.20161, 153.82335, 206.10429, 196.3057094, 8.53, 0.15]);
    asteroids.set('Nysa', [59800, 2.4231171, 0.14901044, 3.71163, 344.18488, 131.49820, 35.2567240, 7.00, 0.46]);
    asteroids.set('Oceana', [60000, 2.6443037, 0.04509855, 5.84590, 282.64035, 352.74826, 192.9306866, 8.69, 0.15]);
    asteroids.set('Octavia', [59800, 2.7592528, 0.25102077, 12.23039, 292.14309, 91.50731, 276.2031562, 9.68, 0.15]);
    asteroids.set('Oda', [60000, 3.7542071, 0.08109201, 9.80536, 216.93505, 156.12687, 45.4820395, 9.97, 0.15]);
    asteroids.set('Oenone', [59800, 2.7673151, 0.03386581, 1.68170, 317.63302, 24.90173, 200.4237609, 9.53, 0.15]);
    asteroids.set('Ohio', [59800, 3.1334626, 0.06652710, 19.12957, 244.54675, 201.43862, 63.4246390, 9.89, 0.15]);
    asteroids.set('Olga', [59800, 2.4032062, 0.22165253, 15.84878, 172.51429, 159.01577, 285.5199112, 9.90, 0.07]);
    asteroids.set('Olympia', [60000, 2.6131952, 0.22065703, 30.01225, 310.03422, 155.69636, 288.7340232, 9.02, 0.15]);
    asteroids.set('Ophelia', [59800, 3.1312196, 0.13200127, 2.54649, 55.64587, 100.47151, 43.8712218, 8.65, 0.15]);
    asteroids.set('Oriola', [60000, 3.0121933, 0.03733118, 7.13137, 325.27150, 243.54658, 266.7977514, 9.21, 0.15]);
    asteroids.set('Ornamenta', [60000, 3.1074006, 0.16024401, 24.89945, 337.76749, 90.08196, 249.1623754, 8.44, 0.15]);
    asteroids.set('Ortrud', [60000, 2.9676386, 0.11868779, 0.39478, 70.60513, 5.70606, 46.6564605, 9.72, 0.15]);
    asteroids.set('Ottegebe', [60000, 2.8038586, 0.19229083, 7.53947, 194.88413, 174.57888, 118.2528684, 9.50, 0.15]);
    asteroids.set('Ottilia', [60000, 3.3470039, 0.03135578, 5.96273, 301.50960, 36.04190, 192.3988267, 9.30, 0.15]);
    asteroids.set('Oulu', [60000, 3.9625225, 0.14223229, 6.46857, 237.68868, 10.04614, 224.5515885, 9.54, 0.15]);
    asteroids.set('Padua', [60000, 2.7482413, 0.07250969, 5.94708, 296.05252, 64.71248, 352.7157504, 9.08, 0.15]);
    asteroids.set('Palamedes', [60000, 5.1315836, 0.07555347, 13.91358, 95.72763, 327.36145, 18.3377919, 9.37, 0.15]);
    asteroids.set('Palatia', [59800, 2.7926110, 0.30012800, 8.21805, 299.09236, 126.33362, 97.1537466, 9.39, 0.15]);
    asteroids.set('Pales', [59800, 3.0986628, 0.22162850, 3.20064, 113.15971, 285.04674, 96.4905193, 7.92, 0.15]);
    asteroids.set('Palisana', [59800, 2.4582872, 0.21437205, 25.20346, 49.08363, 255.77243, 273.9836380, 9.13, 0.15]);
    asteroids.set('Pallas', [59800, 2.7694633, 0.22998645, 34.92714, 310.84262, 172.91790, 315.0911124, 4.12, 0.11]);
    asteroids.set('Palma', [59800, 3.1638137, 0.25356515, 23.79800, 115.09290, 327.26995, 303.4558672, 7.41, 0.15]);
    asteroids.set('Pamela', [60000, 3.0957220, 0.04593257, 13.26513, 52.00407, 245.53471, 171.9225642, 9.72, 0.15]);
    asteroids.set('Pandarus', [60000, 5.1982459, 0.06940030, 1.85531, 42.64899, 179.69650, 98.9303148, 9.24, 0.15]);
    asteroids.set('Pandora', [59800, 2.7586228, 0.14401926, 7.18168, 5.47533, 10.36269, 258.8733385, 7.85, 0.15]);
    asteroids.set('Panopaea', [60000, 2.6161971, 0.18089694, 11.59522, 255.75821, 47.66128, 36.2065188, 8.20, 0.14]);
    asteroids.set('Papagena', [59800, 2.8905135, 0.22883845, 15.01356, 315.65975, 83.79063, 126.1487501, 6.74, 0.37]);
    asteroids.set('Pariana', [60000, 2.6157431, 0.16414908, 11.67278, 86.84942, 85.32755, 208.0251523, 9.08, 0.15]);
    asteroids.set('Parthenope', [59800, 2.4533107, 0.09948662, 4.63143, 195.65855, 125.52629, 226.6474730, 6.73, 0.15]);
    asteroids.set('Parysatis', [59800, 2.7080655, 0.19496827, 13.85013, 298.01541, 123.93434, 191.2540965, 9.44, 0.15]);
    asteroids.set('Patientia', [59800, 3.0646510, 0.07089743, 15.20086, 336.31518, 89.02367, 324.6876622, 6.84, 0.19]);
    asteroids.set('Paulina', [60000, 2.7569411, 0.13345077, 7.83042, 141.52552, 61.69212, 199.6906840, 9.44, 0.15]);
    asteroids.set('Pauly', [60000, 3.0734567, 0.22923496, 9.87398, 187.67376, 120.16156, 15.1412212, 8.83, 0.15]);
    asteroids.set('Pax', [59800, 2.5874183, 0.30961621, 24.40332, 267.03683, 112.10005, 194.1654672, 9.15, 0.15]);
    asteroids.set('Peiroos', [60000, 5.1419944, 0.07717735, 14.66612, 173.17423, 108.77978, 24.7886277, 9.08, 0.15]);
    asteroids.set('Peitho', [60000, 2.4382480, 0.16404945, 7.74725, 32.90863, 47.63897, 313.4298553, 8.91, 0.15]);
    asteroids.set('Penelope', [59800, 2.6795337, 0.17923160, 5.75635, 180.94758, 156.91564, 213.8927866, 8.49, 0.24]);
    asteroids.set('Penthesilea', [60000, 3.0075088, 0.10496384, 3.53531, 56.75905, 335.34249, 339.8123076, 9.93, 0.15]);
    asteroids.set('Pepita', [59800, 3.0700652, 0.11087229, 15.82747, 117.63416, 216.54732, 236.5517484, 9.45, 0.15]);
    asteroids.set('Peraga', [59800, 2.3753740, 0.15199724, 2.93457, 127.72628, 295.38548, 87.7150705, 9.12, 0.15]);
    asteroids.set('Persephone', [59800, 3.0507143, 0.07632350, 13.11549, 192.80966, 346.19707, 303.2985215, 8.95, 0.15]);
    asteroids.set('Petrina', [59800, 2.9987190, 0.09665092, 14.47361, 87.80957, 179.37143, 343.4346971, 8.95, 0.15]);
    asteroids.set('Petropolitana', [59800, 3.2113366, 0.06579974, 3.80238, 91.08656, 340.27912, 74.3259511, 9.24, 0.15]);
    asteroids.set('Phaedra', [60000, 2.8650780, 0.14186276, 12.10771, 290.25688, 327.62362, 98.1200728, 8.37, 0.15]);
    asteroids.set('Phaeo', [60000, 2.7836797, 0.24470132, 8.04456, 114.80652, 252.30469, 133.0135616, 9.12, 0.15]);
    asteroids.set('Philippa', [59800, 3.1154690, 0.02551470, 15.17630, 71.28689, 75.72592, 140.0517198, 9.91, 0.15]);
    asteroids.set('Philippina', [60000, 2.7924228, 0.08423795, 18.89959, 279.38209, 224.54006, 3.0506470, 8.69, 0.15]);
    asteroids.set('Philomela', [59800, 3.1143371, 0.01520132, 7.26164, 203.08769, 72.29975, 303.6018084, 6.64, 0.15]);
    asteroids.set('Philosophia', [60000, 3.1733806, 0.19305639, 9.09347, 268.88082, 325.94052, 129.5107769, 9.18, 0.15]);
    asteroids.set('Phocaea', [60000, 2.3997869, 0.25463646, 21.60898, 90.25367, 214.09518, 184.1310940, 7.89, 0.15]);
    asteroids.set('Phoinix', [60000, 5.1396269, 0.09781281, 14.70405, 85.17116, 325.38512, 53.0438041, 9.84, 0.15]);
    asteroids.set('Phthia', [59800, 2.4508353, 0.03584409, 5.17528, 169.01721, 203.34073, 181.2459494, 9.36, 0.15]);
    asteroids.set('Phyllis', [59800, 2.4637532, 0.10442851, 5.24633, 177.75872, 286.02716, 141.2156857, 9.57, 0.15]);
    asteroids.set('Picka', [60000, 3.1964030, 0.06355434, 8.65978, 57.01536, 250.80992, 152.8914565, 9.48, 0.15]);
    asteroids.set('Pickeringia', [60000, 3.0990076, 0.24117703, 12.28014, 237.96067, 14.89954, 278.2618105, 9.34, 0.15]);
    asteroids.set('Pierretta', [60000, 2.7806660, 0.16043555, 9.03636, 262.18327, 6.20231, 192.7147955, 8.86, 0.15]);
    asteroids.set('Pippa', [60000, 3.1946414, 0.20250305, 9.87449, 180.80113, 290.79972, 17.5183991, 9.66, 0.15]);
    asteroids.set('Pittsburghia', [60000, 2.6671287, 0.05753358, 12.51410, 189.57842, 127.24605, 169.5645680, 9.76, 0.15]);
    asteroids.set('Planckia', [59800, 3.1283858, 0.10945740, 13.56070, 31.21437, 142.36037, 37.7216333, 9.44, 0.15]);
    asteroids.set('Polyhymnia', [59800, 2.8743330, 0.33174993, 1.85271, 338.52116, 8.44674, 224.5325984, 8.56, 0.33]);
    asteroids.set('Polyxena', [60000, 3.2112237, 0.06511904, 17.83392, 280.53381, 23.86618, 45.5399899, 7.95, 0.15]);
    asteroids.set('Polyxo', [60000, 2.7498636, 0.03907500, 4.36281, 112.41212, 181.59181, 232.4825191, 8.18, 0.21]);
    asteroids.set('Pomona', [59800, 2.5877657, 0.08168384, 5.52133, 338.56620, 220.36765, 317.0921009, 7.73, 0.15]);
    asteroids.set('Pompeja', [59800, 2.7374486, 0.05934693, 3.17198, 59.94729, 347.71563, 163.5188514, 8.89, 0.15]);
    asteroids.set('Potomac', [60000, 3.9817318, 0.18127348, 11.40358, 332.70746, 137.43053, 205.5233750, 9.92, 0.15]);
    asteroids.set('Praxedis', [59800, 2.7745501, 0.23553891, 16.86320, 196.53522, 193.05595, 184.4668040, 9.85, 0.15]);
    asteroids.set('Pretoria', [60000, 3.4078053, 0.15437236, 20.54479, 38.10818, 251.80210, 103.4480703, 8.10, 0.15]);
    asteroids.set('Preziosa', [60000, 3.0162310, 0.09326038, 11.01789, 332.02009, 64.98691, 32.0045766, 9.99, 0.15]);
    asteroids.set('Priamus', [60000, 5.1995457, 0.12547676, 8.90353, 336.55470, 301.54722, 47.2544987, 8.69, 0.15]);
    asteroids.set('Princetonia', [59800, 3.1601382, 0.00761712, 13.33803, 207.79550, 44.19529, 38.0923983, 8.42, 0.15]);
    asteroids.set('Prokne', [60000, 2.6168824, 0.23745615, 18.51000, 163.14890, 159.26201, 241.5713922, 7.88, 0.15]);
    asteroids.set('Proserpina', [60000, 2.6543323, 0.08907016, 3.56282, 193.72199, 45.76200, 64.4039681, 7.58, 0.15]);
    asteroids.set('Protogeneia', [59800, 3.1358054, 0.02303425, 1.93267, 102.35732, 248.24583, 121.5728923, 8.80, 0.15]);
    asteroids.set('Prymno', [60000, 2.3313870, 0.08988291, 3.63372, 66.82246, 96.58401, 339.1725806, 9.50, 0.19]);
    asteroids.set('Psyche', [59800, 2.9243992, 0.13403115, 3.09693, 229.26237, 150.03276, 164.4824025, 6.14, 0.20]);
    asteroids.set('Pulcova', [59800, 3.1545148, 0.10682329, 13.09828, 188.73003, 305.54476, 16.6355216, 8.28, 0.15]);
    asteroids.set('Punkaharju', [59800, 2.7828528, 0.26027687, 16.43051, 36.46373, 338.21186, 265.3375265, 9.90, 0.15]);
    asteroids.set('Pyrrhus', [60000, 5.1948889, 0.15046253, 17.47955, 357.01458, 71.11993, 8.9096023, 9.80, 0.15]);
    asteroids.set('Pythia', [60000, 2.3694075, 0.14590355, 12.11722, 173.79765, 88.73221, 293.3278302, 8.94, 0.15]);
    asteroids.set('Quintilla', [60000, 3.1823557, 0.13647576, 3.24360, 44.50236, 176.66526, 107.4135311, 9.77, 0.15]);
    asteroids.set('Rachele', [60000, 2.9233780, 0.19451991, 13.50816, 41.45552, 58.09824, 261.8372042, 7.48, 0.15]);
    asteroids.set('Ratisbona', [60000, 3.2157629, 0.09281030, 14.64235, 172.88658, 7.37740, 256.8139019, 9.28, 0.15]);
    asteroids.set('Recha', [60000, 3.0156777, 0.10997411, 9.82946, 29.93795, 342.66113, 146.7169597, 9.51, 0.15]);
    asteroids.set('Repsolda', [60000, 2.8926532, 0.08556818, 11.78461, 293.36571, 40.06880, 122.4385834, 9.46, 0.15]);
    asteroids.set('Rezia', [60000, 3.3980958, 0.02200065, 12.70463, 351.85278, 49.50934, 141.3282200, 9.08, 0.15]);
    asteroids.set('Rhea', [60000, 3.1109012, 0.15431430, 5.30103, 329.86626, 328.49361, 177.3484918, 9.38, 0.15]);
    asteroids.set('Rhoda', [60000, 2.7997667, 0.16361895, 19.53232, 88.50372, 42.92428, 33.9098576, 9.75, 0.15]);
    asteroids.set('Rhodope', [60000, 2.6854044, 0.21086576, 12.02467, 263.98434, 128.89745, 53.1660926, 9.92, 0.15]);
    asteroids.set('Riga', [60000, 3.3541957, 0.05525302, 22.58861, 26.58853, 186.70283, 101.7571021, 9.90, 0.15]);
    asteroids.set('Rita', [60000, 3.9833710, 0.15525544, 7.18776, 205.53467, 88.14482, 124.5812167, 9.29, 0.15]);
    asteroids.set('Roberta', [60000, 2.4757644, 0.17228261, 5.10261, 139.81675, 148.42453, 243.0644988, 9.11, 0.15]);
    asteroids.set('Rollandia', [60000, 3.9025150, 0.09761421, 2.75870, 19.40352, 134.70981, 172.1929483, 8.87, 0.15]);
    asteroids.set('Roma', [59800, 2.5431672, 0.09525281, 15.80968, 296.47455, 127.05505, 187.5594772, 8.95, 0.15]);
    asteroids.set('Rosa', [60000, 3.0912779, 0.12006513, 1.92376, 65.40645, 47.53752, 20.3735501, 9.90, 0.15]);
    asteroids.set('Roxane', [60000, 2.2866461, 0.08552852, 1.76614, 187.23758, 151.34577, 3.1461479, 9.82, 0.15]);
    asteroids.set('Rusthawelia', [59800, 3.1754949, 0.19458873, 3.08556, 292.33327, 121.50966, 92.4422626, 9.92, 0.15]);
    asteroids.set('Ruth', [59800, 3.0131536, 0.03507967, 9.24060, 44.56493, 214.24367, 18.6253854, 9.66, 0.15]);
    asteroids.set('Sabauda', [59800, 3.0994634, 0.17383211, 15.28368, 56.66470, 71.64150, 24.1981018, 9.70, 0.15]);
    asteroids.set('Sabine', [60000, 3.1415237, 0.17223065, 14.75164, 318.12076, 298.40133, 215.3648282, 8.70, 0.15]);
    asteroids.set('Sapientia', [59800, 2.7707239, 0.16335780, 4.76408, 39.40594, 134.03876, 51.7850040, 8.95, 0.15]);
    asteroids.set('Sappho', [60000, 2.2959130, 0.20002566, 8.67673, 139.54735, 218.64861, 134.1446331, 8.14, 0.15]);
    asteroids.set('Sara', [59800, 2.9801947, 0.04433191, 6.55660, 32.31742, 180.29648, 355.1708792, 9.76, 0.15]);
    asteroids.set('Sarita', [59800, 2.6351022, 0.32003297, 19.04849, 329.51779, 33.14738, 88.2680303, 9.19, 0.15]);
    asteroids.set('Scheherezade', [60000, 3.3582914, 0.05680774, 13.77279, 229.15791, 252.16249, 188.1428294, 9.81, 0.15]);
    asteroids.set('Scheila', [60000, 2.9278219, 0.16236134, 14.65913, 175.55562, 70.58241, 54.1614144, 8.97, 0.15]);
    asteroids.set('Scythia', [59800, 3.1444906, 0.09650290, 14.98303, 141.63104, 274.06499, 98.0881030, 9.70, 0.15]);
    asteroids.set('Seeligeria', [59800, 3.2276225, 0.10472142, 21.33043, 286.02537, 175.88741, 98.8813013, 9.75, 0.15]);
    asteroids.set('Selinur', [59800, 2.6136616, 0.14404696, 9.77881, 74.98851, 289.81556, 195.9784495, 9.37, 0.15]);
    asteroids.set('Semele', [59800, 3.1052929, 0.21602952, 4.82108, 308.90115, 86.07162, 207.8471941, 8.77, 0.15]);
    asteroids.set('Semiramis', [60000, 2.3733902, 0.23367474, 10.72013, 85.29544, 282.01378, 93.1027113, 8.55, 0.24]);
    asteroids.set('Senta', [59800, 2.5887610, 0.22273134, 10.10652, 45.15184, 270.68706, 178.4221542, 9.32, 0.15]);
    asteroids.set('Seppina', [59800, 3.4266771, 0.05104622, 18.75385, 163.16741, 173.91125, 188.9632489, 8.38, 0.15]);
    asteroids.set('Shaposhnikov', [60000, 3.9680091, 0.22102592, 12.48224, 266.65146, 59.03699, 76.9431515, 9.40, 0.15]);
    asteroids.set('Sibylla', [59800, 3.3756170, 0.07464115, 4.66982, 175.83481, 205.92245, 159.3527927, 8.12, 0.15]);
    asteroids.set('Sidonia', [59800, 3.0139326, 0.07714611, 11.01508, 228.92432, 82.63804, 215.5802703, 7.94, 0.15]);
    asteroids.set('Siegena', [59800, 2.8990625, 0.16908947, 20.21905, 220.81329, 166.63816, 144.9147211, 7.74, 0.16]);
    asteroids.set('Sigelinde', [60000, 3.1480688, 0.08982187, 7.69328, 346.20571, 266.86827, 220.4476569, 9.64, 0.15]);
    asteroids.set('Silesia', [60000, 3.1198750, 0.11224380, 3.61305, 31.81975, 34.05117, 95.4060658, 9.51, 0.15]);
    asteroids.set('Silvretta', [59800, 3.2047942, 0.23528006, 20.41238, 34.03691, 6.16044, 88.0863456, 9.95, 0.15]);
    asteroids.set('Simeisa', [59800, 3.9516496, 0.18912576, 2.25748, 177.69668, 265.44282, 64.6016502, 9.03, 0.15]);
    asteroids.set('Siri', [59800, 2.7726735, 0.08836468, 2.84514, 298.05969, 31.54341, 293.8936704, 9.74, 0.15]);
    asteroids.set('Sirona', [60000, 2.7661915, 0.14115227, 3.56398, 94.23513, 63.69748, 162.4120434, 7.88, 0.15]);
    asteroids.set('Siwa', [59800, 2.7334569, 0.21406189, 3.18537, 197.00681, 107.16872, 319.8966137, 8.50, 0.15]);
    asteroids.set('Sophia', [60000, 3.0962827, 0.09332624, 10.55171, 288.95739, 155.87280, 10.4557149, 9.93, 0.15]);
    asteroids.set('Sophrosyne', [60000, 2.5639137, 0.11481792, 11.61198, 85.46316, 345.86088, 85.4492916, 8.82, 0.28]);
    asteroids.set('Sorga', [60000, 2.9899697, 0.14285634, 10.69434, 288.61633, 46.09307, 31.9757036, 9.74, 0.15]);
    asteroids.set('Stereoskopia', [59800, 3.3789843, 0.12033206, 4.89341, 299.81480, 79.52967, 165.2694165, 8.17, 0.15]);
    asteroids.set('Suevia', [59800, 2.7998973, 0.13551074, 6.64757, 348.52830, 199.48477, 7.7995099, 9.61, 0.15]);
    asteroids.set('Suleika', [60000, 2.7110098, 0.23668934, 10.24514, 336.78082, 85.17229, 274.1460170, 8.45, 0.15]);
    asteroids.set('Sundmania', [60000, 3.1910958, 0.05634327, 9.16046, 303.89652, 42.89619, 179.7131890, 9.98, 0.15]);
    asteroids.set('Susanna', [59800, 2.9042572, 0.14233325, 12.07731, 216.90261, 152.94796, 274.3347387, 9.43, 0.15]);
    asteroids.set('Svea', [60000, 2.4773113, 0.02534179, 15.88321, 57.94906, 178.45077, 167.2140862, 9.67, 0.15]);
    asteroids.set('Sylvania', [59800, 2.7919124, 0.18309044, 11.01117, 302.80800, 44.68497, 208.4384948, 9.02, 0.15]);
    asteroids.set('Sylvia', [59800, 3.4787284, 0.09402140, 10.87853, 264.11583, 73.01014, 274.3114973, 6.98, 0.15]);
    asteroids.set('Tabora', [59800, 3.5524529, 0.11776405, 8.32292, 352.62290, 38.37005, 183.0127460, 9.36, 0.15]);
    asteroids.set('Tamara', [59800, 2.3179578, 0.18976109, 23.72350, 238.51711, 32.16942, 280.8796137, 9.34, 0.15]);
    asteroids.set('Tanete', [60000, 2.9981187, 0.09465674, 28.83621, 145.80817, 63.72402, 259.3515463, 8.39, 0.15]);
    asteroids.set('Tatjana', [60000, 3.1662694, 0.18684488, 7.36995, 253.20633, 38.36872, 151.1400756, 9.07, 0.15]);
    asteroids.set('Tauntonia', [59800, 3.2135522, 0.03443724, 21.89124, 25.10535, 102.44594, 44.8051451, 9.80, 0.15]);
    asteroids.set('Tauris', [60000, 3.1583667, 0.30537594, 21.79358, 296.32070, 88.73298, 63.0613622, 8.80, 0.15]);
    asteroids.set('Tekmessa', [60000, 3.1528802, 0.19255049, 4.41846, 28.63500, 11.82283, 54.8331234, 9.52, 0.15]);
    asteroids.set('Telamon', [60000, 5.1412435, 0.10924766, 6.09859, 113.80861, 340.84309, 341.2239777, 9.50, 0.15]);
    asteroids.set('Tercidina', [60000, 2.3247100, 0.06203644, 9.74524, 230.96999, 212.58861, 235.0914528, 8.98, 0.10]);
    asteroids.set('Terentia', [60000, 2.9325990, 0.11180675, 9.86328, 95.65458, 275.18137, 136.1988692, 9.97, 0.15]);
    asteroids.set('Tergeste', [60000, 3.0166653, 0.08039555, 13.17664, 243.33366, 233.44495, 324.0947960, 7.99, 0.15]);
    asteroids.set('Terpsichore', [59800, 2.8515367, 0.21162934, 7.80527, 51.53012, 0.94995, 232.7648829, 8.65, 0.15]);
    asteroids.set('Teucer', [60000, 5.1106123, 0.08887414, 22.38573, 48.23589, 69.93928, 328.6631525, 8.90, 0.15]);
    asteroids.set('Thalia', [59800, 2.6311409, 0.23157658, 10.09935, 61.20418, 66.55751, 253.1685606, 7.17, 0.15]);
    asteroids.set('Thekla', [60000, 3.0413877, 0.06467937, 1.62737, 253.22612, 228.31070, 41.8776222, 9.48, 0.15]);
    asteroids.set('Themis', [60000, 3.1525229, 0.11778696, 0.74503, 107.47180, 36.43639, 241.8999598, 7.27, 0.19]);
    asteroids.set('Theobalda', [59800, 3.1799206, 0.25605147, 13.71214, 135.04073, 321.23785, 45.6700531, 9.79, 0.15]);
    asteroids.set('Thetis', [59800, 2.4710277, 0.13268483, 5.59245, 135.77033, 125.54315, 248.3584146, 7.82, 0.15]);
    asteroids.set('Thia', [60000, 2.5852448, 0.24341381, 11.93679, 308.64572, 255.19759, 336.8148645, 8.66, 0.15]);
    asteroids.set('Thisbe', [59800, 2.7687848, 0.16179366, 5.21345, 36.62199, 276.43270, 305.2857770, 7.30, 0.14]);
    asteroids.set('Thoon', [59800, 5.1563799, 0.03874779, 27.43051, 197.96461, 93.24919, 354.8858768, 9.88, 0.15]);
    asteroids.set('Thronium', [60000, 5.1915636, 0.04836425, 30.51410, 116.03005, 259.56195, 58.7617856, 9.69, 0.15]);
    asteroids.set('Thule', [60000, 4.2643360, 0.04387013, 2.33485, 27.42761, 71.87875, 344.1375971, 8.52, 0.15]);
    asteroids.set('Thusnelda', [60000, 2.3545036, 0.22310334, 10.86491, 142.70979, 200.77496, 173.0781865, 9.29, 0.15]);
    asteroids.set('Thyra', [59800, 2.3801169, 0.19295473, 11.58793, 96.78382, 308.78504, 339.3568362, 7.68, 0.12]);
    asteroids.set('Tisiphone', [59800, 3.3620126, 0.09480712, 18.98428, 253.94527, 290.46773, 187.2832199, 8.49, 0.15]);
    asteroids.set('Titania', [59800, 2.6979036, 0.21711684, 16.90357, 30.86256, 75.93539, 135.8055408, 9.43, 0.06]);
    asteroids.set('Tokio', [60000, 2.6513958, 0.22349915, 9.49644, 241.93842, 97.19014, 5.6341003, 8.91, 0.15]);
    asteroids.set('Tolosa', [60000, 2.4496462, 0.16198265, 3.20216, 260.62194, 54.72252, 245.7448970, 8.88, 0.15]);
    asteroids.set('Tone', [60000, 3.3572240, 0.05087194, 17.18571, 300.32451, 320.59594, 60.9711886, 9.47, 0.15]);
    asteroids.set('Toni', [59800, 2.9403904, 0.15329474, 8.98704, 220.22412, 150.18892, 152.0991687, 9.50, 0.15]);
    asteroids.set('Toronto', [60000, 3.1876493, 0.12184904, 18.39031, 290.25187, 252.44173, 347.5258910, 9.97, 0.15]);
    asteroids.set('Triberga', [60000, 2.5194847, 0.07521006, 13.80811, 177.38020, 187.44585, 61.0791188, 9.89, 0.15]);
    asteroids.set('Tugela', [60000, 3.2343948, 0.14873081, 18.91191, 139.44386, 44.54906, 210.6196377, 9.88, 0.15]);
    asteroids.set('Turandot', [60000, 3.1885119, 0.21776193, 8.56455, 199.55133, 129.11243, 148.5689934, 9.40, 0.15]);
    asteroids.set('Turnera', [59800, 3.0228295, 0.10118469, 10.74957, 296.36573, 42.95220, 228.4024950, 9.89, 0.15]);
    asteroids.set('Tyche', [60000, 2.6152389, 0.20533922, 14.32835, 155.63379, 207.53915, 356.4359800, 8.35, 0.23]);
    asteroids.set('Ulla', [60000, 3.5454445, 0.09190264, 18.79133, 232.04853, 146.35684, 328.8429851, 8.78, 0.15]);
    asteroids.set('Ulula', [60000, 2.5346788, 0.05535712, 14.27265, 232.97530, 233.69190, 353.5881491, 9.09, 0.15]);
    asteroids.set('Una', [60000, 2.7295638, 0.06715011, 3.82348, 50.66923, 8.59244, 311.8842243, 9.15, 0.15]);
    asteroids.set('Undina', [59800, 3.1902852, 0.10591094, 9.91657, 237.80276, 101.45904, 28.9007558, 6.82, 0.15]);
    asteroids.set('Unitas', [59800, 2.3577004, 0.15070833, 7.27802, 168.11979, 141.85561, 327.6887483, 8.85, 0.15]);
    asteroids.set('Urania', [60000, 2.3651222, 0.12716077, 2.09395, 86.90917, 307.42458, 48.9339845, 7.61, 0.15]);
    asteroids.set('Urda', [60000, 2.8520289, 0.03759455, 2.21754, 128.18859, 166.10620, 173.2282386, 9.25, 0.15]);
    asteroids.set('Urhixidur', [59800, 3.1631982, 0.14168316, 20.84010, 356.35363, 357.23096, 224.9586128, 9.40, 0.15]);
    asteroids.set('Ursina', [60000, 2.7982462, 0.10815210, 13.28955, 21.84590, 309.31944, 33.2678913, 9.97, 0.15]);
    asteroids.set('Ursula', [60000, 3.1264814, 0.10314542, 15.94457, 341.57439, 336.40986, 186.4592346, 7.51, 0.27]);
    asteroids.set('Ute', [59800, 3.0500656, 0.18126962, 12.29208, 220.84964, 133.20275, 143.6489742, 9.80, 0.15]);
    asteroids.set('Vala', [60000, 2.4315552, 0.06876436, 4.96316, 161.65648, 65.55904, 191.9154051, 9.96, 0.15]);
    asteroids.set('Valentine', [60000, 2.9867347, 0.04561924, 4.79395, 320.35271, 71.79448, 319.3284795, 9.11, 0.15]);
    asteroids.set('Valeria', [59800, 2.9780507, 0.12328994, 13.44729, 256.52145, 189.38775, 133.9801617, 9.39, 0.15]);
    asteroids.set('Vanadis', [59800, 2.6632089, 0.20850412, 2.10562, 300.92622, 115.06492, 198.0788341, 9.20, 0.15]);
    asteroids.set('Vaticana', [60000, 2.7916696, 0.21750452, 12.86013, 198.37416, 58.05779, 54.8534241, 7.82, 0.20]);
    asteroids.set('Velleda', [59800, 2.4394709, 0.10538672, 2.92365, 328.08173, 23.24034, 151.8394174, 9.18, 0.15]);
    asteroids.set('Venetia', [59800, 2.6703337, 0.08617813, 10.25214, 281.27577, 114.77410, 99.3899448, 8.34, 0.15]);
    asteroids.set('Venusia', [59800, 4.0120935, 0.21713156, 2.09148, 174.86052, 256.22634, 59.6891810, 9.48, 0.15]);
    asteroids.set('Vera', [59800, 3.0977725, 0.19732466, 5.17834, 331.69990, 61.04127, 156.0002387, 7.85, 0.15]);
    asteroids.set('Veritas', [60000, 3.1721527, 0.08948295, 9.29405, 193.41061, 178.03753, 90.8065750, 8.61, 0.15]);
    asteroids.set('Vesta', [59800, 2.3619872, 0.08840189, 7.14078, 151.25778, 103.80081, 61.1922990, 3.21, 0.32]);
    asteroids.set('Vibilia', [60000, 2.6537439, 0.23560848, 4.81502, 294.69767, 76.17442, 326.2958574, 8.15, 0.17]);
    asteroids.set('Victoria', [60000, 2.3333880, 0.22052580, 8.37412, 69.61069, 235.36334, 160.4440095, 7.34, 0.22]);
    asteroids.set('Vienna', [59800, 2.6349355, 0.24842283, 12.86643, 140.01129, 227.89039, 349.4354462, 9.41, 0.15]);
    asteroids.set('Vincentina', [60000, 3.1425408, 0.05654789, 10.58047, 333.97281, 346.69492, 346.0771915, 8.71, 0.15]);
    asteroids.set('Vindobona', [59800, 2.9266918, 0.15324417, 5.09947, 269.38602, 350.49624, 85.4934054, 9.64, 0.15]);
    asteroids.set('Virginia', [60000, 2.6509856, 0.28515175, 2.83939, 199.97774, 173.46710, 118.4862276, 9.38, 0.15]);
    asteroids.set('Virtus', [60000, 2.9849870, 0.06435704, 7.07870, 215.38753, 38.07316, 244.7078398, 9.15, 0.15]);
    asteroids.set('Vundtia', [59800, 3.1433368, 0.07832285, 11.00679, 228.28043, 182.85860, 105.4691026, 9.17, 0.15]);
    asteroids.set('Wallia', [60000, 3.1404854, 0.23787000, 8.90627, 16.14956, 322.63270, 27.5685621, 9.58, 0.15]);
    asteroids.set('Walpurga', [60000, 2.9989960, 0.06505879, 13.32836, 47.71646, 182.91102, 86.2687103, 9.99, 0.15]);
    asteroids.set('Washingtonia', [59800, 3.1682456, 0.27114936, 16.87032, 302.28160, 58.84576, 241.3672169, 9.34, 0.15]);
    asteroids.set('Watsonia', [59800, 2.7602792, 0.09686663, 18.04824, 87.46211, 124.32533, 337.0023639, 9.42, 0.15]);
    asteroids.set('Weringia', [60000, 2.7113733, 0.20388833, 15.97111, 153.86386, 134.94766, 184.7608642, 9.94, 0.15]);
    asteroids.set('Whittemora', [59800, 3.1700914, 0.23327911, 11.48242, 315.42491, 110.98614, 120.2666083, 9.31, 0.15]);
    asteroids.set('Wilhelmina', [60000, 2.8840850, 0.13889755, 14.31951, 173.55892, 209.65440, 85.7166172, 9.80, 0.15]);
    asteroids.set('Winchester', [59800, 3.0012256, 0.33949318, 18.21540, 277.46196, 129.09696, 114.1762740, 7.88, 0.15]);
    asteroids.set('Wratislavia', [60000, 3.1502001, 0.17680866, 11.24436, 114.50919, 253.05109, 117.2907686, 8.07, 0.15]);
    asteroids.set('Xanthe', [59800, 2.9354543, 0.11498722, 15.34939, 181.34083, 107.37780, 241.8373801, 9.39, 0.15]);
    asteroids.set('Xanthippe', [60000, 2.7276205, 0.22606297, 9.77896, 338.28493, 241.81289, 68.0234302, 8.78, 0.15]);
    asteroids.set('Yrsa', [59800, 2.7656150, 0.15586813, 9.20576, 31.78639, 99.19568, 30.8691745, 9.09, 0.15]);
    asteroids.set('Zelia', [59800, 2.3579107, 0.13077922, 5.50142, 334.72149, 354.72813, 128.6429876, 9.56, 0.15]);
    asteroids.set('Zelinda', [60000, 2.2973894, 0.23094018, 18.09374, 214.57845, 278.33299, 10.6701141, 8.66, 0.15]);
    asteroids.set('Zerbinetta', [60000, 2.9444673, 0.03027476, 14.19089, 284.22451, 351.71420, 253.8865854, 9.59, 0.15]);
    asteroids.set('Zwetana', [60000, 2.5701622, 0.20948158, 12.76789, 131.58338, 71.84125, 122.6809767, 9.50, 0.15]);
    const selast = document.getElementById('asteroid');
    asteroids.forEach((v, i) => {
        if (!(i === 'Name' || i === 'Title' || i === 'units')) {
            let opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = i;
            selast.appendChild(opt);
        }
    });
    const comets = new Map();
    comets.set('Name', ['comepoch', 'comq', 'come', 'comi', 'comomega', 'comOmega', 'comTp']);
    comets.set('Title', ['Epoch of the elements represented as the Modified Julian Date (MJD)', 'Perihelion (AU)', 'Eccentricity of the orbit',
        'Inclination of the orbit with respect to the J2000 ecliptic plane (deg)', 'Argument of perihelion (deg)', 'Longitude of ascending node (deg)',
        'Time of Perihelion passage (JD)']);
    comets.set('units', ['dy', 'AU', '', 'deg', 'deg', 'deg', '']);
    comets.set('0/GENERIC', [0, 0, 0, 0, 0, 0, '']);
    comets.set('1P/Halley', [39857, 0.57471580, 0.96794279, 162.18787, 112.25779, 59.11448, '19860208.64890']);
    comets.set('2P/Encke', [57412, 0.33589810, 0.84835703, 11.78109, 186.55066, 334.56732, '20170310.06150']);
    comets.set('3D/Biela', [-9480, 0.87907300, 0.75129900, 13.21640, 221.65880, 250.66900, '18321126.61520']);
    comets.set('4P/Faye', [58517, 1.57732485, 0.58461517, 8.16450, 205.97354, 194.83134, '20210905.63777']);
    comets.set('5D/Brorsen', [7440, 0.58984700, 0.80979600, 29.38210, 14.94680, 102.96760, '18790331.03410']);
    comets.set('6P/dArrest', [59302, 1.35458525, 0.61267012, 19.51243, 178.10646, 138.93710, '20210917.78929']);
    comets.set('7P/Pons-Winn', [57111, 1.23920586, 0.63756416, 22.33474, 172.50586, 93.41593, '20150130.52779']);
    comets.set('8P/Tuttle', [54701, 1.02726309, 0.81978762, 54.98197, 207.51152, 270.34216, '20080127.01802']);
    comets.set('9P/Tempel_1', [57363, 1.54231772, 0.50983237, 10.47342, 179.18749, 68.77046, '20160802.55842']);
    comets.set('10P/Tempel_2', [56314, 1.42118386, 0.53631410, 12.02642, 195.55482, 117.80185, '20100704.43325']);
    comets.set('11P/Tempel-S', [58787, 1.38972100, 0.57742731, 14.43595, 167.76486, 238.98811, '20201126.00951']);
    comets.set('12P/Pons-Bro', [58170, 0.77651883, 0.95427749, 74.08710, 199.15076, 255.71769, '20240423.06973']);
    comets.set('13P/Olbers', [35760, 1.17845061, 0.93029715, 44.60989, 64.64121, 86.10313, '19560619.13533']);
    comets.set('14P/Wolf', [55880, 2.72880051, 0.35745330, 27.94264, 159.19641, 202.10798, '20090227.60710']);
    comets.set('15P/Finlay', [57327, 0.97668698, 0.72018544, 6.80048, 347.62575, 13.75388, '20141227.07264']);
    comets.set('16P/Brooks_2', [57526, 1.45680919, 0.56806954, 4.30421, 220.08912, 159.33251, '20140613.29924']);
    comets.set('17P/Holmes', [57672, 2.06617251, 0.43018644, 19.07101, 24.73739, 326.77392, '20140326.75289']);
    comets.set('18D/Perrine-', [40240, 1.27224808, 0.64258098, 17.75898, 166.05042, 240.87555, '19681101.54213']);
    comets.set('19P/Borrelly', [59255, 1.30589764, 0.63794907, 29.32350, 351.85637, 74.31074, '20220201.75234']);
    comets.set('20D/Westphal', [20080, 1.25401276, 0.91983119, 40.89006, 57.08095, 348.00645, '19131126.79026']);
    comets.set('21P/Giacobin', [58063, 1.01349375, 0.71046678, 32.00303, 172.80916, 195.40514, '20180910.26547']);
    comets.set('22P/Kopff', [58456, 1.55517026, 0.54852454, 4.73947, 162.90713, 120.83734, '20151025.78378']);
    comets.set('23P/Brorsen-', [47800, 0.47875271, 0.97195226, 19.33394, 129.61068, 311.58546, '19890911.93743']);
    comets.set('24P/Schaumas', [57350, 1.20616902, 0.70483774, 11.73398, 58.00232, 79.66578, '20171116.76082']);
    comets.set('25D/Neujmin_', [24960, 1.33816965, 0.56681860, 10.63871, 193.70403, 328.71695, '19270116.22411']);
    comets.set('26P/Grigg-Sk', [55360, 1.11315475, 0.63367738, 22.39648, 1.64810, 211.64351, '20080323.67364']);
    comets.set('27P/Crommeli', [56364, 0.74828747, 0.91898109, 28.96687, 196.02540, 250.62641, '20110803.89109']);
    comets.set('28P/Neujmin_', [57354, 1.57866163, 0.77240683, 14.31683, 347.59215, 346.35028, '20210316.01784']);
    comets.set('29P/Schwassm', [56226, 5.74062435, 0.04339913, 9.37589, 50.70146, 312.53149, '20190413.49914']);
    comets.set('30P/Reinmuth', [56225, 1.88069262, 0.50166935, 8.12675, 13.14530, 119.72716, '20100419.82939']);
    comets.set('31P/Schwassm', [55554, 3.42431336, 0.19295189, 4.54649, 17.93007, 114.18763, '20100929.45721']);
    comets.set('32P/Comas_So', [55348, 2.00856896, 0.55464744, 9.96850, 53.30742, 57.84347, '20141019.71899']);
    comets.set('33P/Daniel', [55481, 2.16672312, 0.46236006, 22.38615, 18.90527, 66.54083, '20080720.41091']);
    comets.set('34D/Gale', [29080, 1.18290700, 0.76071900, 11.72810, 209.15720, 67.92350, '19380618.48320']);
    comets.set('36P/Whipple', [54696, 3.08920642, 0.25822984, 9.93535, 201.95447, 182.39129, '20120101.45938']);
    comets.set('37P/Forbes', [57840, 1.60885568, 0.53447616, 8.96205, 330.00044, 314.63958, '20180504.14735']);
    comets.set('38P/Stephan-', [58262, 1.58850505, 0.85928629, 18.35295, 359.58868, 78.00036, '20181110.98734']);
    comets.set('39P/Oterma', [56910, 5.70222031, 0.22933251, 1.47036, 88.70051, 304.58336, '20230403.90558']);
    comets.set('40P/Vaisala_', [57262, 1.81977116, 0.63161520, 11.49264, 47.28886, 133.84017, '20141115.84235']);
    comets.set('41P/Tuttle-G', [57844, 1.04504274, 0.66125069, 9.22913, 62.15859, 141.06629, '20170412.75225']);
    comets.set('42P/Neujmin_', [57380, 2.02775520, 0.58417475, 3.98459, 147.12039, 150.27997, '20150408.20955']);
    comets.set('43P/Wolf-Har', [56756, 1.35709442, 0.59490965, 15.97248, 191.55916, 249.86636, '20160819.41799']);
    comets.set('44P/Reinmuth', [57772, 2.11837556, 0.42619282, 5.89637, 58.23693, 286.45720, '20150323.92046']);
    comets.set('45P/Honda-Mr', [57979, 0.53265015, 0.82399608, 4.24817, 326.34420, 88.93460, '20161231.28415']);
    comets.set('46P/Wirtanen', [58465, 1.05535577, 0.65875968, 11.74759, 356.34109, 82.15764, '20181212.93120']);
    comets.set('47P/Ashbrook', [55635, 2.80180815, 0.31885901, 13.05261, 357.83536, 356.98418, '20090201.39068']);
    comets.set('48P/Johnson', [55228, 2.30241851, 0.36781174, 13.66069, 207.82662, 117.28850, '20110928.96976']);
    comets.set('49P/Arend-Ri', [55800, 1.42383153, 0.60040567, 19.04992, 332.78769, 118.87791, '20111019.07647']);
    comets.set('50P/Arend', [55190, 1.92216181, 0.52981917, 19.16231, 49.01452, 355.32477, '20071101.46331']);
    comets.set('51P/Harringt', [57925, 1.69911177, 0.54204517, 5.42365, 269.16356, 83.71771, '20150812.41130']);
    comets.set('51P/Harringt', [51677, 1.56809686, 0.56206636, 8.65496, 233.58784, 119.18778, '20010605.69335']);
    comets.set('52P/Harringt', [57561, 1.77497832, 0.54006288, 10.23173, 139.65915, 336.83612, '20140307.36594']);
    comets.set('53P/Van_Bies', [55782, 2.42621835, 0.55107446, 6.61125, 134.26547, 148.89780, '20160430.79999']);
    comets.set('54P/de_Vico-', [55013, 2.17176403, 0.42704749, 6.06716, 1.93333, 358.86003, '20091128.57012']);
    comets.set('55P/Tempel-T', [51040, 0.97642792, 0.90555272, 162.48658, 172.50027, 235.27099, '19980228.09773']);
    comets.set('56P/Slaughte', [56513, 2.50586300, 0.50729911, 8.14721, 44.21693, 346.03804, '20160718.07831']);
    comets.set('57P/duToit-N', [58109, 1.72603115, 0.49972855, 2.84859, 115.13248, 188.81059, '20150522.43988']);
    comets.set('58P/Jackson-', [59045, 1.37742868, 0.66261074, 13.10968, 200.44346, 159.07871, '20200527.42442']);
    comets.set('59P/Kearns-K', [56598, 2.35160762, 0.47637804, 9.34293, 127.74501, 312.86044, '20090309.61664']);
    comets.set('60P/Tsuchins', [57220, 1.61956677, 0.53853669, 3.60895, 216.49367, 267.66129, '20120513.88926']);
    comets.set('61P/Shajn-Sc', [58559, 2.12170152, 0.42399131, 6.00061, 221.96849, 163.00123, '20150930.20796']);
    comets.set('62P/Tsuchins', [55455, 1.38404802, 0.59787285, 9.71011, 30.11865, 90.36359, '20110630.25197']);
    comets.set('63P/Wild_1', [56717, 1.95057715, 0.65091903, 19.77998, 169.02952, 358.00186, '20130410.83134']);
    comets.set('64P/Swift-Ge', [58096, 1.39335149, 0.68731996, 8.94840, 97.14416, 300.00097, '20181103.91198']);
    comets.set('65P/Gunn', [57869, 2.91018481, 0.25030044, 9.18457, 213.49834, 62.01698, '20171016.59734']);
    comets.set('66P/du_Toit', [56961, 1.28545145, 0.78656817, 18.66897, 257.34273, 21.99985, '20180520.46895']);
    comets.set('67P/Churyumo', [57687, 1.24057410, 0.64188972, 7.05257, 12.83985, 50.04724, '20150813.40703']);
    comets.set('68P/Klemola', [57446, 1.76205307, 0.64033260, 11.18351, 153.83989, 175.30038, '20191111.92271']);
    comets.set('69P/Taylor', [57495, 2.28012398, 0.41366506, 22.04228, 343.66891, 104.85370, '20190318.42381']);
    comets.set('70P/Kojima', [57120, 2.00660699, 0.45395742, 6.60015, 1.95870, 119.27075, '20141020.68368']);
    comets.set('71P/Clark', [58140, 1.58622783, 0.49442254, 9.44524, 208.92388, 59.44528, '20170630.21852']);
    comets.set('72P/Denning-', [56981, 0.78416121, 0.81915453, 9.16928, 337.85804, 36.10920, '20140711.63722']);
    comets.set('73P/Schwassm', [57800, 0.97218015, 0.68554136, 11.23703, 199.38733, 69.66266, '20170316.84142']);
    comets.set('74P/Smirnova', [56193, 3.55080263, 0.14764764, 6.65102, 86.59520, 77.08398, '20090726.70724']);
    comets.set('75D/Kohoutek', [49520, 1.78465694, 0.49630740, 5.90721, 175.80172, 269.68609, '19940629.89848']);
    comets.set('76P/West-Koh', [55628, 1.60212347, 0.53841702, 30.47514, 0.04844, 84.11256, '20130508.03518']);
    comets.set('77P/Longmore', [55605, 2.31390190, 0.35758865, 24.40106, 196.88279, 14.90741, '20090708.11885']);
    comets.set('78P/Gehrels_', [56987, 2.01153655, 0.46163737, 6.25270, 192.75586, 210.56268, '20120112.10494']);
    comets.set('79P/du_Toit-', [54391, 1.23050410, 0.59408527, 2.89318, 253.26969, 307.83865, '20080528.41143']);
    comets.set('80P/Peters-H', [51849, 1.63076532, 0.59671245, 29.87212, 338.63941, 259.89683, '19980810.86794']);
    comets.set('81P/Wild_2', [56178, 1.59711750, 0.53715733, 3.23778, 41.71385, 136.09988, '20100222.40780']);
    comets.set('82P/Gehrels_', [52484, 3.62570515, 0.12325421, 1.12655, 227.49566, 239.59146, '20010830.28808']);
    comets.set('83D/Russell_', [46240, 1.61154163, 0.51720991, 22.65946, 0.37623, 230.84201, '19850705.22914']);
    comets.set('84P/Giclas', [55894, 1.84049078, 0.49446792, 7.28429, 276.40479, 112.38934, '20130723.07238']);
    comets.set('85P/Boethin', [54252, 1.13465745, 0.78116063, 4.29529, 37.61838, 359.39611, '20081212.74656']);
    comets.set('86P/Wild_3', [57683, 2.26351125, 0.37219132, 15.47206, 179.18674, 72.39420, '20150403.48522']);
    comets.set('87P/Bus', [57467, 2.10117482, 0.38934769, 2.60239, 24.75639, 181.88981, '20131219.90148']);
    comets.set('88P/Howell', [57474, 1.35819687, 0.56309441, 4.38310, 235.89373, 56.69760, '20150406.22095']);
    comets.set('89P/Russell_', [57560, 2.22056191, 0.40800838, 12.07654, 250.14144, 41.44521, '20161214.66852']);
    comets.set('90P/Gehrels_', [57800, 2.97489732, 0.50979286, 9.63538, 29.27003, 13.25183, '20170619.27542']);
    comets.set('91P/Russell_', [54575, 2.60566495, 0.33022414, 14.09217, 354.86575, 247.89598, '20050627.09016']);
    comets.set('92P/Sanguin', [57375, 1.82545566, 0.65932548, 19.44461, 163.78903, 181.45892, '20150301.18354']);
    comets.set('93P/Lovas_1', [57800, 1.70015017, 0.61266504, 12.20450, 74.89804, 339.62742, '20170301.45234']);
    comets.set('94P/Russell_', [55606, 2.23987046, 0.36300858, 6.18303, 92.80005, 70.91025, '20100329.61165']);
    comets.set('96P/Machholz', [54879, 0.12391231, 0.95913614, 58.33965, 14.76615, 94.31055, '20070405.43679']);
    comets.set('97P/Metcalf-', [57799, 2.60658933, 0.45693729, 17.86104, 228.22729, 185.17452, '20220220.90451']);
    comets.set('98P/Takamiza', [55915, 1.67233815, 0.56058596, 10.54598, 157.94742, 114.75267, '20130805.47650']);
    comets.set('99P/Kowal_1', [56640, 4.73454719, 0.22883464, 4.33543, 174.20331, 28.18388, '20070124.26023']);
    comets.set('100P/Hartley', [57098, 2.00965853, 0.41375825, 25.58437, 181.87815, 37.76702, '20160402.10295']);
    comets.set('101P/Chernyk', [56929, 2.32504073, 0.59784896, 5.03322, 277.41453, 116.61005, '20200107.52445']);
    comets.set('101P/Chernyk', [53733, 2.35052705, 0.59472034, 5.07833, 263.18516, 130.23378, '20051224.38934']);
    comets.set('102P/Shoemak', [56078, 1.96858326, 0.47316549, 26.24491, 18.74460, 339.87334, '20130901.15602']);
    comets.set('103P/Hartley', [55530, 1.05867910, 0.69488838, 13.61927, 181.20999, 219.75832, '20101028.26532']);
    comets.set('104P/Kowal_2', [59483, 1.07309960, 0.66545590, 5.70107, 227.24546, 207.21370, '20220111.61713']);
    comets.set('105P/Singer_', [55871, 2.05083344, 0.40929035, 9.17061, 46.68276, 192.42004, '20120226.19579']);
    comets.set('106P/Schuste', [57498, 1.54069625, 0.58953218, 20.19769, 355.98264, 50.32240, '20140720.46287']);
    comets.set('108P/Ciffreo', [58257, 1.52612512, 0.58101345, 13.98016, 356.86171, 52.40239, '20211011.22817']);
    comets.set('110P/Hartley', [58237, 2.46453371, 0.31626529, 11.69814, 167.39701, 287.52981, '20141216.67445']);
    comets.set('111P/Helin-R', [56320, 3.70430339, 0.10962077, 4.22881, 3.37794, 89.79400, '20130130.62924']);
    comets.set('112P/Urata-N', [55471, 1.45879769, 0.58749274, 24.20145, 21.35220, 31.93183, '20130624.50086']);
    comets.set('113P/Spitale', [55335, 2.12586645, 0.42364166, 5.77736, 49.79322, 14.46138, '20080323.60255']);
    comets.set('114P/Wiseman', [58215, 1.57940864, 0.55447919, 18.27305, 172.84346, 271.06207, '20200114.23917']);
    comets.set('115P/Maury', [56994, 2.05742992, 0.51829000, 11.66974, 121.11408, 176.07761, '20111005.02764']);
    comets.set('116P/Wild_4', [57415, 2.18709467, 0.37240687, 3.60790, 173.31468, 20.99225, '20160111.54046']);
    comets.set('117P/Helin-R', [57801, 3.05220188, 0.25436214, 8.70061, 222.51352, 58.87394, '20140326.74513']);
    comets.set('118P/Shoemak', [58697, 1.91749762, 0.44276210, 8.63951, 305.52464, 148.27354, '20160630.90840']);
    comets.set('119P/Parker-', [56376, 3.02693142, 0.29218697, 5.19609, 181.26145, 244.10106, '20140402.43004']);
    comets.set('120P/Mueller', [54349, 2.74386253, 0.33653878, 8.79120, 30.00803, 4.44277, '20040929.43697']);
    comets.set('121P/Shoemak', [53649, 2.64901253, 0.33909991, 17.71347, 6.40674, 99.62074, '20040902.25740']);
    comets.set('122P/de_Vico', [50280, 0.65933734, 0.96270889, 85.38275, 12.99609, 79.62450, '19951006.00017']);
    comets.set('123P/West-Ha', [57284, 2.12610687, 0.44927022, 15.35455, 102.91845, 46.52737, '20190204.33986']);
    comets.set('124P/Mrkos', [56780, 1.64533591, 0.50387914, 31.52904, 183.71165, 0.41457, '20140409.61603']);
    comets.set('125P/Spacewa', [55419, 1.52521199, 0.51204018, 9.98646, 87.29360, 153.18775, '20130217.38322']);
    comets.set('126P/IRAS', [53047, 1.71615658, 0.69509313, 45.83523, 356.95544, 357.75030, '20100301.82009']);
    comets.set('127P/Holt-Ol', [56933, 2.20507227, 0.36083008, 14.30241, 6.74162, 13.66233, '20160317.87067']);
    comets.set('128P/Shoemak', [56670, 3.05437936, 0.32201698, 4.36331, 210.49733, 214.34334, '20170110.13905']);
    comets.set('129P/Shoemak', [55834, 3.81043962, 0.12106167, 3.56488, 308.14139, 187.85925, '20140201.63738']);
    comets.set('130P/McNaugh', [55810, 2.09808030, 0.40675773, 7.30729, 224.37574, 89.81249, '20110624.79950']);
    comets.set('131P/Mueller', [55473, 2.41774152, 0.34301150, 7.35516, 179.63386, 214.22656, '20120107.84577']);
    comets.set('132P/Helin-R', [59491, 1.69177456, 0.56469630, 5.38252, 216.34552, 173.99657, '20211113.10647']);
    comets.set('134P/Kowal-V', [56476, 2.57172479, 0.58715335, 4.34871, 18.56022, 202.12343, '20140521.44767']);
    comets.set('135P/Shoemak', [50500, 2.71688981, 0.29022851, 6.05058, 22.69803, 213.36198, '19991210.50177']);
    comets.set('136P/Mueller', [56643, 2.97589810, 0.29158194, 9.41553, 225.30347, 137.46895, '20160531.53057']);
    comets.set('137P/Shoemak', [57361, 1.93333763, 0.57205569, 4.85037, 140.98910, 233.07335, '20181214.09735']);
    comets.set('138P/Shoemak', [53612, 1.70730220, 0.52945188, 10.07952, 95.64911, 309.44177, '20050719.90432']);
    comets.set('139P/Vaisala', [55516, 3.40292121, 0.24752589, 2.32873, 165.72540, 242.37759, '20080420.44238']);
    comets.set('140P/Bowell-', [51320, 1.97187717, 0.69176166, 3.83583, 173.08677, 343.45646, '19990514.81193']);
    comets.set('141P/Machhol', [58692, 0.80430522, 0.73670750, 13.97778, 153.61716, 241.87709, '20201215.95046']);
    comets.set('142P/Ge-Wang', [55465, 2.48789981, 0.49972474, 12.30744, 175.68806, 176.51966, '20100530.33596']);
    comets.set('143P/Kowal-M', [56610, 2.54091937, 0.40879202, 4.68972, 320.78436, 245.32140, '20090610.71773']);
    comets.set('144P/Kushida', [54937, 1.43898874, 0.62781794, 4.10912, 216.09503, 245.55924, '20090126.85560']);
    comets.set('145P/Shoemak', [57082, 1.90160196, 0.54098164, 11.26421, 10.42031, 26.84076, '20170831.83446']);
    comets.set('146P/Shoemak', [56472, 1.42576921, 0.64672666, 23.09409, 317.06895, 53.44724, '20160629.56512']);
    comets.set('147P/Kushida', [54801, 2.75623414, 0.27602521, 2.36796, 346.84083, 93.76207, '20080922.86845']);
    comets.set('148P/Anderso', [56036, 1.69551827, 0.53907243, 3.68182, 6.58326, 89.78672, '20150613.81177']);
    comets.set('149P/Mueller', [56317, 2.64727789, 0.38820079, 29.75161, 43.58392, 145.25340, '20100218.64291']);
    comets.set('150P/LONEOS', [55526, 1.76875030, 0.54528344, 18.49723, 245.66497, 272.42648, '20081125.69327']);
    comets.set('151P/Helin', [55249, 2.49192559, 0.57089385, 4.73472, 215.53038, 143.55402, '20151006.62417']);
    comets.set('152P/Helin-L', [56465, 3.11600707, 0.30710705, 9.86812, 163.73213, 91.91060, '20120708.90015']);
    comets.set('154P/Brewing', [56215, 1.60806779, 0.67070895, 17.82970, 48.98860, 343.50330, '20131212.40218']);
    comets.set('155P/Shoemak', [55697, 1.80622560, 0.72609617, 6.39800, 14.60224, 97.27601, '20021208.07389']);
    comets.set('156P/Russell', [58936, 1.33312151, 0.61490849, 17.26329, 0.38172, 35.39435, '20201117.83050']);
    comets.set('157P/Tritton', [58757, 1.26608974, 0.62348921, 8.33317, 153.37619, 294.66563, '20220823.08632']);
    comets.set('158P/Kowal-L', [55792, 4.57720408, 0.03023063, 7.90823, 231.97866, 137.30936, '20120919.07670']);
    comets.set('159P/LONEOS', [57130, 3.62108550, 0.38207662, 23.46243, 4.87280, 55.06435, '20180523.19420']);
    comets.set('160P/LINEAR', [56189, 2.06654105, 0.47909715, 17.27621, 18.19830, 337.00209, '20120918.52311']);
    comets.set('161P/Hartley', [53190, 1.27482939, 0.83508810, 95.69805, 47.09145, 1.39817, '20050620.85053']);
    comets.set('162P/Siding_', [55414, 1.23310595, 0.59604625, 27.81674, 356.31147, 31.23909, '20100308.42653']);
    comets.set('163P/NEAT', [54059, 1.92834010, 0.47602079, 12.50464, 348.05306, 103.34736, '20050201.35394']);
    comets.set('164P/Christe', [57002, 1.68145002, 0.54028603, 16.26202, 326.00391, 88.30743, '20180530.91224']);
    comets.set('165P/LINEAR', [52114, 6.83037329, 0.62158598, 15.90526, 126.20542, 0.63877, '20000615.79343']);
    comets.set('166P/NEAT', [52819, 8.56430227, 0.38310092, 15.36840, 321.87890, 64.48884, '20020520.84095']);
    comets.set('167P/CINEOS', [53075, 11.78353505, 0.26995304, 19.12721, 343.64917, 295.83745, '20010409.94340']);
    comets.set('168P/Hergenr', [55839, 1.41527912, 0.60947452, 21.92937, 13.91913, 356.47767, '20121001.93338']);
    comets.set('169P/NEAT', [54558, 0.60741174, 0.76678610, 11.30079, 217.97739, 176.20568, '20091130.41710']);
    comets.set('170P/Christe', [56060, 2.92070846, 0.30528883, 10.12411, 225.72034, 142.94482, '20140917.37342']);
    comets.set('171P/Spahr', [57879, 1.77133235, 0.50202106, 21.93637, 347.18786, 101.70817, '20190113.75810']);
    comets.set('172P/Yeung', [55534, 2.23748984, 0.36720100, 11.78391, 181.46296, 38.65512, '20081020.58584']);
    comets.set('173P/Mueller', [55944, 4.20421625, 0.26130097, 16.50480, 29.39726, 100.49764, '20080515.58736']);
    comets.set('175P/Hergenr', [55465, 2.01593894, 0.42217485, 6.09393, 51.13961, 126.43548, '20130526.20095']);
    comets.set('178P/Hug-Bel', [56251, 1.93384280, 0.47299195, 10.97529, 296.94633, 103.57485, '20130723.01577']);
    comets.set('179P/Jedicke', [55519, 4.08680565, 0.30921723, 19.86458, 295.57034, 115.83170, '20071204.08270']);
    comets.set('180P/NEAT', [56181, 2.48523294, 0.35484723, 16.88474, 95.22423, 84.62383, '20151214.49751']);
    comets.set('181P/Shoemak', [56908, 1.12359304, 0.70732283, 16.98118, 333.79885, 37.67946, '20140610.32583']);
    comets.set('182P/LONEOS', [53241, 0.97802239, 0.66634235, 16.90929, 51.43386, 75.10005, '20070205.83297']);
    comets.set('183P/Korlevi', [56015, 3.88786757, 0.13497602, 18.73904, 160.89549, 5.84224, '20080503.41503']);
    comets.set('184P/Lovas_2', [56460, 1.39402342, 0.60425111, 1.55145, 78.06092, 277.74497, '20130728.46552']);
    comets.set('185P/Petriew', [56473, 0.93197571, 0.69933460, 14.00710, 181.93919, 214.09125, '20120813.55137']);
    comets.set('186P/Garradd', [55759, 4.32136113, 0.12691823, 28.54761, 287.31686, 327.58734, '20080528.96869']);
    comets.set('187P/LINEAR', [55601, 3.71532782, 0.17318236, 13.65509, 134.73582, 111.73609, '20081022.58376']);
    comets.set('188P/LINEAR-', [57800, 2.56514539, 0.41485297, 10.51136, 26.77146, 358.98147, '20170217.04270']);
    comets.set('189P/NEAT', [54804, 1.17392484, 0.59764285, 20.40063, 15.30742, 282.20006, '20070725.93843']);
    comets.set('190P/Mueller', [54370, 2.03192376, 0.52074559, 2.18985, 49.73912, 336.11513, '20070708.20909']);
    comets.set('191P/McNaugh', [55221, 2.04655065, 0.42069278, 8.75915, 274.20788, 106.50679, '20070913.55602']);
    comets.set('192P/Shoemak', [54160, 1.46055925, 0.77408003, 24.56930, 312.78420, 51.66440, '20071217.24100']);
    comets.set('193P/LINEAR-', [57117, 2.16616838, 0.39423172, 10.68702, 8.44366, 335.19425, '20141124.68207']);
    comets.set('194P/LINEAR', [57520, 1.69771356, 0.57558084, 11.13801, 130.71146, 351.99377, '20160302.44251']);
    comets.set('195P/Hill', [54816, 4.43857362, 0.31486042, 36.36210, 249.62046, 243.25081, '20090121.11477']);
    comets.set('196P/Tichy', [56831, 2.13494218, 0.43464142, 19.37584, 11.93513, 24.26407, '20150614.77715']);
    comets.set('197P/LINEAR', [53966, 1.06118644, 0.62992222, 25.55595, 188.75023, 66.39570, '20080518.99892']);
    comets.set('198P/ODAS', [52695, 1.97910375, 0.44769399, 1.34985, 69.06402, 358.74418, '20050503.03592']);
    comets.set('199P/Shoemak', [54872, 2.93541074, 0.50778118, 24.76498, 191.93509, 92.94813, '20090409.89880']);
    comets.set('200P/Larsen', [54471, 3.27219905, 0.33323678, 12.12106, 133.69329, 234.81922, '20080825.00667']);
    comets.set('201P/LONEOS', [56055, 1.33998367, 0.61286098, 7.03652, 24.95396, 35.28567, '20150114.33452']);
    comets.set('202P/Scotti', [54139, 2.52660776, 0.33032808, 2.18539, 255.63346, 194.58760, '20090207.40446']);
    comets.set('203P/Korlevi', [55955, 3.18300673, 0.31604419, 2.97381, 154.72461, 290.52006, '20100209.03662']);
    comets.set('204P/LINEAR-', [56182, 1.93305507, 0.47178112, 6.58725, 354.95004, 109.07194, '20151211.44963']);
    comets.set('205P/Giacobi', [56614, 1.53577958, 0.56697965, 15.28897, 154.26933, 179.62686, '20150513.99882']);
    comets.set('206P/Barnard', [53922, 1.13648217, 0.64853407, 33.20383, 181.36105, 204.37648, '20081024.04663']);
    comets.set('207P/NEAT', [53977, 0.94374271, 0.75703158, 10.15005, 271.20379, 200.67274, '20081106.38387']);
    comets.set('208P/McMilla', [55579, 2.52917279, 0.37420899, 4.41401, 310.69056, 36.39599, '20080513.61958']);
    comets.set('209P/LINEAR', [55947, 0.90284100, 0.69202140, 20.61912, 152.13066, 63.60832, '20140423.22452']);
    comets.set('210P/Christe', [55230, 0.53444526, 0.83169742, 10.21718, 345.76600, 93.87237, '20081219.98103']);
    comets.set('211P/Hill', [56135, 2.35601970, 0.33854862, 18.88163, 4.26192, 117.26625, '20090508.05886']);
    comets.set('212P/NEAT', [54872, 1.65445584, 0.57888436, 22.39745, 15.04691, 98.92840, '20081203.26571']);
    comets.set('213P/Van_Nes', [57990, 1.98334589, 0.40745922, 10.37782, 5.55477, 311.31673, '20170924.36902']);
    comets.set('213P/Van_Nes', [55791, 2.12272853, 0.37972730, 10.24005, 3.34150, 312.67067, '20110616.42975']);
    comets.set('214P/LINEAR', [52790, 1.83983724, 0.48955169, 15.22604, 190.15897, 348.30743, '20020301.04637']);
    comets.set('215P/NEAT', [57218, 3.45281170, 0.20153107, 10.05884, 253.29562, 63.61723, '20190922.95189']);
    comets.set('216P/LINEAR', [53093, 2.15394361, 0.44534911, 9.04324, 151.64693, 359.91110, '20010212.96151']);
    comets.set('217P/LINEAR', [55420, 1.22424331, 0.68961463, 12.88031, 246.76489, 125.62084, '20090908.98605']);
    comets.set('218P/LINEAR', [55422, 1.70086769, 0.49109034, 18.17407, 10.78458, 226.61093, '20090622.59325']);
    comets.set('219P/LINEAR', [55447, 2.36398571, 0.35296734, 11.52575, 107.70993, 231.02675, '20100305.47501']);
    comets.set('220P/McNaugh', [55808, 1.54966544, 0.50220479, 8.13175, 180.75443, 150.12217, '20091215.25744']);
    comets.set('221P/LINEAR', [55781, 1.77976605, 0.48757555, 11.43102, 39.51118, 229.98931, '20090124.35609']);
    comets.set('222P/LINEAR', [54620, 0.78058663, 0.72682414, 5.14652, 345.42675, 7.13280, '20090901.17000']);
    comets.set('223P/Skiff', [55797, 2.42045002, 0.41643604, 27.05444, 37.86067, 346.82414, '20100814.51776']);
    comets.set('224P/LINEAR-', [53303, 1.88191470, 0.43695741, 14.73062, 9.29224, 43.51390, '20030917.11285']);
    comets.set('225P/LINEAR', [57800, 1.32451382, 0.63752798, 21.33499, 3.92032, 14.18217, '20160816.94535']);
    comets.set('226P/Pigott-', [57800, 1.77635298, 0.52882409, 44.00425, 341.12146, 54.00682, '20160905.13308']);
    comets.set('227P/Catalin', [54885, 1.79546456, 0.49962388, 6.52419, 90.13068, 49.88919, '20100903.82802']);
    comets.set('228P/LINEAR', [55640, 3.43044788, 0.17692863, 7.91535, 114.80888, 31.06635, '20110823.93832']);
    comets.set('229P/Gibbs', [56411, 2.44792580, 0.37713608, 26.08160, 224.26481, 157.96392, '20090804.13392']);
    comets.set('230P/LINEAR', [56784, 1.48495867, 0.56331183, 14.65407, 308.90759, 112.39840, '20151117.97693']);
    comets.set('231P/LINEAR-', [56074, 3.03236717, 0.24681958, 12.32566, 42.42989, 133.08185, '20110516.45049']);
    comets.set('232P/Hill', [55471, 2.98286063, 0.33492236, 14.63508, 53.41737, 56.12914, '20091001.45230']);
    comets.set('233P/La_Sagr', [56519, 1.78771498, 0.41065789, 11.27894, 27.16155, 74.98138, '20150625.33111']);
    comets.set('234P/LINEAR', [54884, 2.86071468, 0.25117726, 11.51356, 358.42485, 179.73331, '20091223.90953']);
    comets.set('235P/LINEAR', [55708, 2.74760209, 0.31340467, 8.89261, 333.73506, 204.48667, '20100321.71799']);
    comets.set('236P/LINEAR', [55923, 1.83178748, 0.50865001, 16.33407, 119.33535, 245.66150, '20100908.72361']);
    comets.set('237P/LINEAR', [56613, 1.96811633, 0.43969001, 14.69259, 21.93002, 248.35618, '20161005.14193']);
    comets.set('238P/Read', [59837, 2.36934881, 0.25167357, 1.26409, 324.20691, 51.62535, '20220605.43180']);
    comets.set('239P/LINEAR', [57665, 1.64759935, 0.63143654, 11.30562, 220.38372, 255.94452, '20190109.97063']);
    comets.set('240P/NEAT', [56728, 2.12838909, 0.44979404, 23.52461, 352.15223, 74.95183, '20101004.76256']);
    comets.set('241P/LINEAR', [57040, 1.93237069, 0.60991749, 20.86831, 110.52568, 305.80664, '20100717.35748']);
    comets.set('242P/Spahr', [55415, 3.87841483, 0.31418517, 32.25063, 250.27240, 181.09803, '20120409.56202']);
    comets.set('243P/NEAT', [55547, 2.45609235, 0.35974228, 7.63466, 283.94365, 87.72478, '20110303.48295']);
    comets.set('244P/Scotti', [55937, 3.91819201, 0.20001588, 2.25901, 92.57826, 354.16150, '20120120.24094']);
    comets.set('245P/WISE', [55048, 2.13943191, 0.46614825, 21.08784, 316.39992, 318.52721, '20100204.53737']);
    comets.set('246P/NEAT', [56290, 2.87976170, 0.28506671, 15.97173, 176.19266, 78.78056, '20130128.72594']);
    comets.set('247P/LINEAR', [55813, 1.48438938, 0.62561919, 13.68233, 47.33931, 54.12250, '20110104.16452']);
    comets.set('248P/Gibbs', [55427, 2.14674039, 0.64116120, 6.36779, 209.91277, 207.78826, '20110208.70994']);
    comets.set('249P/LINEAR', [56856, 0.50249060, 0.81862344, 8.40002, 64.78372, 239.87579, '20151126.80066']);
    comets.set('250P/Larson', [56434, 2.21256040, 0.40735398, 13.29556, 44.92480, 73.74355, '20101114.85886']);
    comets.set('251P/LINEAR', [53813, 1.71153476, 0.50978380, 23.50978, 30.87911, 219.55442, '20040618.82486']);
    comets.set('252P/LINEAR', [57552, 0.99604590, 0.67308502, 10.42220, 343.31047, 190.94850, '20160315.26355']);
    comets.set('253P/PANSTAR', [55819, 2.03943976, 0.41258672, 4.93928, 231.00578, 146.93820, '20111124.13867']);
    comets.set('254P/McNaugh', [58961, 3.13704123, 0.32070364, 32.56812, 219.44309, 129.17143, '20200929.44940']);
    comets.set('255P/Levy', [54456, 0.99201756, 0.67200978, 18.33304, 179.59296, 279.78005, '20061007.38469']);
    comets.set('256P/LINEAR', [55542, 2.69010334, 0.41795759, 27.63977, 124.17994, 81.44946, '20130317.90300']);
    comets.set('257P/Catalin', [57009, 2.13054822, 0.43238314, 20.24043, 117.88224, 207.85079, '20130604.41643']);
    comets.set('258P/PANSTAR', [57540, 3.47812133, 0.21036720, 6.74523, 26.01433, 126.29486, '20200618.06479']);
    comets.set('259P/Garradd', [55618, 1.79593884, 0.34152970, 15.89854, 256.59091, 51.96970, '20130125.24612']);
    comets.set('260P/McNaugh', [56943, 1.49146421, 0.59426383, 15.76861, 15.57816, 351.86319, '20120912.50575']);
    comets.set('261P/Larson', [56698, 2.18415099, 0.39187691, 6.33655, 58.97020, 298.42573, '20120930.10131']);
    comets.set('262P/McNaugh', [55919, 1.28025961, 0.81540093, 29.07942, 171.16976, 218.01431, '20121204.45959']);
    comets.set('263P/Gibbs', [54747, 1.23781612, 0.59209276, 14.54758, 26.49353, 113.29932, '20070101.95870']);
    comets.set('264P/Larsen', [53699, 2.43828010, 0.37373545, 25.14827, 346.61906, 220.96755, '20040313.26384']);
    comets.set('265P/LINEAR', [52926, 1.50544953, 0.64602512, 14.69119, 32.72050, 344.71123, '20030905.80878']);
    comets.set('266P/Christe', [57931, 2.33233753, 0.33964561, 3.42713, 98.00969, 5.00363, '20200419.84269']);
    comets.set('267P/LONEOS', [54368, 1.33765114, 0.59338984, 5.36834, 96.85509, 245.24890, '20060902.93387']);
    comets.set('268P/Bernard', [54236, 2.35012629, 0.48020468, 15.66322, 358.20476, 129.22083, '20050814.03427']);
    comets.set('269P/Jedicke', [55129, 4.07739532, 0.43465335, 6.61167, 223.91728, 248.99416, '20141126.06384']);
    comets.set('270P/Gehrels', [54667, 3.59452096, 0.46760427, 2.85957, 211.47607, 225.68144, '20130718.52041']);
    comets.set('271P/van_Hou', [56196, 4.24969008, 0.39067132, 6.85611, 35.08846, 9.59038, '20130705.54499']);
    comets.set('272P/NEAT', [55231, 2.41994746, 0.45578764, 18.21388, 26.09758, 111.63576, '20130302.93537']);
    comets.set('274P/Tombaug', [57195, 2.44449882, 0.43978642, 15.83460, 38.57204, 81.36849, '20130223.57892']);
    comets.set('275P/Hermann', [53091, 1.64906001, 0.71393870, 21.57096, 173.13908, 349.27007, '19990219.98175']);
    comets.set('276P/Vorobjo', [57096, 3.90329632, 0.27522074, 14.40478, 205.63996, 212.79746, '20130105.66135']);
    comets.set('277P/LINEAR', [57647, 1.91419691, 0.50379346, 16.74833, 152.17627, 276.35215, '20130604.82512']);
    comets.set('278P/McNaugh', [57181, 2.09606407, 0.43343798, 6.68367, 237.92275, 15.49257, '20130802.43580']);
    comets.set('279P/La_Sagr', [55734, 2.14914850, 0.39856065, 5.05457, 5.97748, 346.26703, '20091010.43332']);
    comets.set('280P/Larsen', [54800, 2.62559767, 0.41806901, 11.77969, 104.83568, 131.49609, '20040510.87577']);
    comets.set('281P/MOSS', [55655, 4.01509083, 0.17352693, 4.72257, 26.32760, 87.17244, '20120511.76204']);
    comets.set('283P/Spacewa', [55999, 2.12644493, 0.48567912, 14.46436, 21.99538, 161.24817, '20130406.99024']);
    comets.set('284P/McNaugh', [56563, 2.28920839, 0.37697176, 11.86204, 202.87145, 144.29795, '20140902.50604']);
    comets.set('285P/LINEAR', [58862, 1.72323646, 0.61783094, 25.02245, 178.40194, 185.48191, '20230112.92051']);
    comets.set('286P/Christe', [58091, 2.37083248, 0.42397355, 17.03615, 24.69745, 283.94415, '20140105.98205']);
    comets.set('287P/Christe', [55946, 3.04890518, 0.27000321, 16.30336, 189.20962, 139.10904, '20141228.48766']);
    comets.set('289P/Blanpai', [58703, 0.95889091, 0.68512776, 5.89739, 9.84834, 68.92445, '20191220.99242']);
    comets.set('290P/Jager', [55287, 2.15449728, 0.64700621, 19.06958, 180.92126, 303.48546, '20140314.94835']);
    comets.set('291P/NEAT', [55781, 2.59421333, 0.43028025, 5.95605, 175.94358, 241.03521, '20131215.23589']);
    comets.set('292P/Li', [54955, 2.53500681, 0.58678712, 24.31616, 318.84793, 91.86043, '20140206.37082']);
    comets.set('293P/Spacewa', [56659, 2.11175237, 0.41974111, 9.06484, 41.15285, 78.43779, '20140110.28829']);
    comets.set('294P/LINEAR', [55453, 1.28220736, 0.59860596, 18.54176, 234.16865, 314.33830, '20080616.61377']);
    comets.set('295P/LINEAR', [54489, 2.05938836, 0.61472400, 21.09564, 73.36404, 7.68520, '20020109.54254']);
    comets.set('296P/Garradd', [56859, 1.83068239, 0.47734904, 25.20398, 350.02768, 263.67649, '20140301.28033']);
    comets.set('297P/Beshore', [54890, 2.40884148, 0.30860610, 10.26339, 131.82004, 98.28508, '20080321.02873']);
    comets.set('298P/Christe', [54341, 2.05074926, 0.41245123, 8.02164, 95.62397, 57.11786, '20070305.28941']);
    comets.set('299P/Catalin', [56936, 3.13956453, 0.28206924, 10.47992, 323.50620, 271.68103, '20150223.26550']);
    comets.set('300P/Catalin', [54244, 0.82473692, 0.69380416, 5.69669, 222.66612, 95.85934, '20050728.16216']);
    comets.set('301P/LINEAR-', [52675, 2.34630895, 0.58742378, 10.61830, 189.40094, 355.78321, '20010130.68616']);
    comets.set('302P/Lemmon-', [57419, 3.30223798, 0.22839327, 6.03107, 208.29437, 121.78414, '20160430.61612']);
    comets.set('303P/NEAT', [54880, 2.48453437, 0.51044664, 7.06594, 356.55158, 348.21596, '20141006.65351']);
    comets.set('304P/Ory', [55772, 1.38137426, 0.57417592, 2.75565, 329.66137, 60.68208, '20081019.72113']);
    comets.set('305P/Skiff', [55698, 1.40413201, 0.69611098, 11.51937, 144.89235, 242.02283, '20141119.13851']);
    comets.set('306P/LINEAR', [53403, 1.24693648, 0.59825272, 8.36446, 0.76867, 341.49855, '20030813.96299']);
    comets.set('307P/LINEAR', [56366, 1.88871084, 0.67474337, 4.42484, 222.11262, 158.12086, '20141220.09357']);
    comets.set('308P/Lagerkv', [54113, 4.25617997, 0.36228552, 4.84039, 333.70418, 63.14293, '20150515.12407']);
    comets.set('309P/LINEAR', [55079, 1.75105070, 0.60662096, 17.66184, 50.77657, 11.43955, '20050927.93485']);
    comets.set('310P/Hill', [54740, 2.39625835, 0.42479369, 13.18153, 31.19555, 9.04300, '20061018.22525']);
    comets.set('311P/PANSTAR', [56894, 1.93611896, 0.11555816, 4.96804, 144.29281, 279.28932, '20140415.96901']);
    comets.set('312P/NEAT', [57971, 1.97133446, 0.43012611, 19.79186, 207.68646, 144.88770, '20200924.81879']);
    comets.set('313P/Gibbs', [57301, 2.39200293, 0.24168034, 10.96637, 253.51983, 106.49588, '20140828.50701']);
    comets.set('314P/Montani', [55855, 4.24916334, 0.41595010, 3.97659, 213.40791, 267.70338, '20161007.86787']);
    comets.set('315P/LONEOS', [56171, 2.42979310, 0.51628328, 17.90660, 66.94322, 69.60053, '20161207.44319']);
    comets.set('316P/LONEOS-', [53833, 3.60741900, 0.16650192, 9.88290, 191.76806, 246.93247, '20061107.76294']);
    comets.set('317P/WISE', [56433, 1.24112063, 0.58023673, 11.96257, 334.74141, 275.69289, '20150808.48542']);
    comets.set('318P/McNaugh', [56030, 2.44545920, 0.67524420, 17.89485, 313.17722, 35.75431, '20151021.01891']);
    comets.set('319P/Catalin', [56545, 1.19698482, 0.66498959, 15.07423, 203.68089, 111.36670, '20150701.93174']);
    comets.set('320P/McNaugh', [55658, 0.98536033, 0.68244389, 4.89356, 0.66597, 295.95598, '20100221.08254']);
    comets.set('321P/SOHO', [53458, 0.04692555, 0.98066226, 19.73750, 172.40550, 165.26972, '20041207.82281']);
    comets.set('322P/SOHO', [57179, 0.05365556, 0.97867648, 12.58924, 49.04948, 359.52449, '20150904.06405']);
    comets.set('323P/SOHO', [59257, 0.03920680, 0.98481466, 5.36993, 353.17404, 324.22939, '20210117.63134']);
    comets.set('324P/La_Sagr', [56273, 2.61798135, 0.15378585, 21.42003, 58.90025, 270.65101, '20100622.89317']);
    comets.set('325P/Yang-Ga', [55960, 1.28049289, 0.62407647, 16.31803, 346.99565, 258.87250, '20090522.39319']);
    comets.set('326P/Hill', [56104, 2.77672841, 0.31821820, 2.47057, 278.83371, 99.82129, '20151021.78662']);
    comets.set('327P/Van_Nes', [58990, 1.55825301, 0.56267683, 36.23991, 185.01757, 173.96948, '20220902.67819']);
    comets.set('328P/LONEOS-', [54195, 1.87989699, 0.55191653, 17.71142, 30.32950, 341.81272, '20070511.24204']);
    comets.set('329P/LINEAR-', [56422, 1.66000127, 0.68010907, 21.46698, 342.31380, 88.79191, '20151205.26457']);
    comets.set('330P/Catalin', [55516, 2.97082169, 0.54918143, 15.54544, 186.72737, 294.33278, '20160901.57884']);
    comets.set('331P/Gibbs', [56466, 2.87995443, 0.04165334, 9.73831, 177.85065, 216.85819, '20150614.81569']);
    comets.set('332P/Ikeya-M', [55520, 1.57884325, 0.48859089, 9.37796, 152.42958, 3.81849, '20101013.33779']);
    comets.set('333P/LINEAR', [57030, 1.11543237, 0.73590688, 131.87945, 26.14304, 115.56258, '20160403.93857']);
    comets.set('334P/NEAT', [55462, 4.18783353, 0.35449298, 19.05701, 81.10729, 92.78487, '20170519.55999']);
    comets.set('335P/Gibbs', [55244, 1.63815520, 0.54346795, 7.27547, 162.30730, 330.89261, '20090122.33707']);
    comets.set('336P/McNaugh', [54677, 2.63328960, 0.45286158, 18.56211, 313.96467, 299.23996, '20060818.35862']);
    comets.set('337P/WISE', [58355, 1.65422657, 0.49688927, 15.36915, 160.91802, 106.08031, '20160713.48364']);
    comets.set('338P/McNaugh', [56457, 2.29634114, 0.41121432, 25.37280, 4.65491, 9.85282, '20161121.69800']);
    comets.set('339P/Gibbs', [55339, 1.32423675, 0.63978977, 5.74842, 27.16268, 172.77584, '20090625.98575']);
    comets.set('340P/Boattin', [55510, 3.04715837, 0.28087305, 2.08209, 36.01922, 291.82755, '20080227.02166']);
    comets.set('341P/Gibbs', [56193, 2.51208544, 0.41471432, 3.79893, 312.41248, 30.06277, '20160526.41429']);
    comets.set('342P/SOHO', [57600, 0.05294199, 0.98260206, 13.27479, 58.70418, 43.40094, '20160701.63593']);
    comets.set('343P/NEAT-LO', [56552, 2.27654256, 0.58418072, 5.58418, 137.58119, 257.26645, '20170127.18062']);
    comets.set('344P/Read', [55525, 2.82509021, 0.42195369, 3.48312, 140.36997, 273.29244, '20060110.66055']);
    comets.set('345P/LINEAR', [56780, 3.15587781, 0.21942983, 2.72450, 196.76216, 154.53420, '20160716.84842']);
    comets.set('346P/Catalin', [55742, 2.22352275, 0.50389945, 22.16789, 335.75279, 102.56470, '20070820.52349']);
    comets.set('347P/PANSTAR', [57239, 2.22358808, 0.38430062, 11.74536, 98.48324, 261.05438, '20160911.50486']);
    comets.set('348P/PANSTAR', [58206, 2.21300979, 0.30165714, 17.56630, 134.16509, 313.55585, '20160623.10994']);
    comets.set('349P/Lemmon', [57302, 2.49593333, 0.30051171, 5.49877, 256.25382, 331.81599, '20170827.83805']);
    comets.set('350P/McNaugh', [55791, 3.74821896, 0.08691049, 7.35648, 150.05691, 65.66932, '20091104.21557']);
    comets.set('351P/Wiegert', [57042, 3.12143381, 0.29513359, 12.78930, 352.36539, 283.50176, '20151116.76078']);
    comets.set('352P/Skiff', [56220, 2.52252942, 0.61768943, 21.06501, 309.35338, 28.14329, '20170621.01695']);
    comets.set('353P/McNaugh', [56186, 2.20927014, 0.46943339, 28.42356, 230.50522, 121.60491, '20090623.13750']);
    comets.set('354P/LINEAR', [56669, 2.00355966, 0.12497107, 5.25593, 132.74247, 320.23521, '20130522.00285']);
    comets.set('355P/LINEAR-', [55660, 1.70772982, 0.50812623, 11.04416, 336.40216, 51.44170, '20110424.60503']);
    comets.set('356P/WISE', [57781, 2.68937163, 0.35398019, 9.63026, 226.20928, 160.80979, '20171217.26011']);
    comets.set('357P/Hill', [55170, 2.51184047, 0.43548563, 6.32599, 1.28845, 44.67503, '20081224.04823']);
    comets.set('358P/PANSTAR', [56372, 2.41037778, 0.23612375, 11.05783, 300.57690, 85.77653, '20120910.92620']);
    comets.set('359P/LONEOS', [57128, 3.13779864, 0.32248320, 10.26283, 200.24846, 149.80643, '20170821.18375']);
    comets.set('360P/WISE', [56907, 1.86183692, 0.49725236, 24.08125, 354.19682, 2.23700, '20170819.12849']);
    comets.set('361P/Spacewa', [58011, 2.78002850, 0.43788757, 13.88283, 219.24286, 203.27794, '20180702.61615']);
    comets.set('363P/Lemmon', [56838, 1.50615137, 0.55765372, 3.97332, 315.21697, 169.94828, '20111209.06295']);
    comets.set('364P/PANSTAR', [57843, 0.79820579, 0.72255534, 12.15528, 211.92464, 46.22771, '20180624.41147']);
    comets.set('365P/PANSTAR', [58101, 1.35912126, 0.57334364, 9.83643, 66.39748, 87.44250, '20180210.75664']);
    comets.set('366P/Spacewa', [55320, 2.28492436, 0.34736448, 8.85375, 153.58156, 70.79708, '20120105.44799']);
    comets.set('367P/Catalin', [56029, 2.52830887, 0.27988242, 8.45953, 173.47913, 58.74148, '20111129.83974']);
    comets.set('368P/NEAT', [56083, 2.04431309, 0.62854670, 15.44795, 118.80835, 258.16600, '20180909.03488']);
    comets.set('369P/Hill', [57084, 1.95285221, 0.55464071, 10.31844, 13.33281, 47.36951, '20181014.75168']);
    comets.set('370P/NEAT', [54038, 2.50442253, 0.61224889, 19.36593, 356.83002, 55.26851, '20020124.36489']);
    comets.set('371P/LINEAR-', [54648, 2.17364210, 0.47798664, 17.41329, 308.64364, 67.41064, '20100326.89581']);
    comets.set('372P/McNaugh', [54936, 3.80375879, 0.15350456, 9.51853, 27.45514, 325.86008, '20090421.54094']);
    comets.set('373P/Rinner', [56703, 2.30542160, 0.39368305, 13.77060, 221.21775, 232.01892, '20111106.62668']);
    comets.set('374P/Larson', [55703, 2.67059188, 0.46250522, 10.79085, 51.42024, 8.16132, '20071209.75036']);
    comets.set('375P/Hill', [57232, 1.89251924, 0.66003940, 17.36984, 119.43429, 359.97403, '20181220.77744']);
    comets.set('376P/LONEOS', [55634, 2.84203403, 0.51472959, 1.18887, 285.44186, 315.16597, '20050814.02048']);
    comets.set('377P/Scotti', [56842, 5.03639236, 0.25147638, 9.01700, 354.46935, 226.03019, '20200710.07960']);
    comets.set('378P/McNaugh', [58291, 3.37963692, 0.46676212, 19.10946, 194.32556, 94.52268, '20201022.82678']);
    comets.set('379P/Spacewa', [56168, 2.34181802, 0.33648876, 12.37945, 31.06870, 184.06185, '20121213.51110']);
    comets.set('380P/PANSTAR', [58429, 3.04970613, 0.32645818, 8.23398, 90.06018, 133.11389, '20190606.95067']);
    comets.set('381P/LINEAR-', [57213, 2.28319547, 0.67945045, 28.46231, 172.54422, 174.10845, '20190929.73708']);
    comets.set('382P/Larson', [57002, 4.38038720, 0.27620488, 7.86734, 175.53754, 181.66545, '20070819.08176']);
    comets.set('383P/Christe', [54466, 1.35895238, 0.61142650, 11.86778, 128.06104, 213.63720, '20060830.23956']);
    comets.set('384P/Kowalsk', [58322, 1.11836357, 0.61537453, 7.28612, 37.28417, 354.45788, '20191011.24086']);
    comets.set('385P/Hill', [56253, 2.55523315, 0.40226883, 16.85565, 44.32879, 357.15734, '20101109.42480']);
    comets.set('386P/PANSTAR', [57295, 2.35929943, 0.41776560, 15.24431, 353.35094, 134.97912, '20120621.17303']);
    comets.set('387P/Boattin', [57120, 1.26716627, 0.73595147, 8.89982, 162.77686, 259.35600, '20190905.36649']);
    comets.set('388P/Gibbs', [56851, 1.99675738, 0.61889291, 23.88048, 42.47154, 37.15510, '20190722.37036']);
    comets.set('389P/Siding_', [56604, 1.65962328, 0.70466929, 160.07192, 249.49030, 218.81124, '20200102.84941']);
    comets.set('390P/Gibbs', [57451, 1.70901390, 0.70583170, 18.52210, 231.73775, 152.71857, '20200323.98061']);
    comets.set('391P/Kowalsk', [54714, 4.11948077, 0.11982312, 21.27463, 186.88485, 124.76216, '20080219.97475']);
    comets.set('392P/LINEAR', [54304, 1.95418136, 0.68253089, 4.93693, 71.99831, 25.10701, '20050110.42588']);
    comets.set('393P/Spacewa', [55867, 4.20210082, 0.11969160, 16.80709, 328.57812, 36.41114, '20090526.35497']);
    comets.set('394P/PANSTAR', [57815, 2.73648747, 0.36926837, 8.52731, 54.47988, 98.15086, '20191129.93249']);
    comets.set('395P/Catalin', [59642, 4.06489155, 0.38162139, 3.27657, 89.92589, 223.58397, '20211230.44286']);
    comets.set('396P/Leonard', [58022, 3.98329566, 0.41809394, 5.43362, 8.64174, 136.67271, '20190828.86629']);
    comets.set('397P/Lemmon', [57976, 2.31787987, 0.39989333, 11.03220, 12.39132, 9.01096, '20200620.07815']);
    comets.set('398P/Boattin', [59200, 1.30569341, 0.58256817, 11.01527, 320.23471, 127.46297, '20201226.74443']);
    comets.set('399P/PANSTAR', [58058, 2.12740606, 0.44186792, 13.34607, 213.32333, 207.56482, '20210526.65735']);
    comets.set('400P/PANSTAR', [58905, 2.10411604, 0.40901339, 10.92636, 238.71074, 176.40550, '20210209.94141']);
    comets.set('401P/McNaugh', [54728, 2.37958712, 0.58200168, 12.86504, 310.24313, 0.09584, '20060507.70233']);
    comets.set('402P/LINEAR', [55787, 3.92324384, 0.43810483, 30.86439, 326.89479, 123.17523, '20030629.04149']);
    comets.set('403P/CATALIN', [57066, 2.68442566, 0.50365776, 12.32332, 277.85123, 163.85134, '20200915.36127']);
    comets.set('404P/Bressi', [57880, 4.68302738, 0.09167082, 9.76264, 139.26759, 264.63351, '20111022.07561']);
    comets.set('405P/Lemmon', [58091, 1.12121699, 0.68914700, 9.36507, 112.29282, 3.31117, '20201224.59190']);
    comets.set('406P/Gibbs', [54965, 1.46534136, 0.57404352, 1.43395, 353.07037, 8.80718, '20070826.82314']);
    comets.set('407P/PANSTAR', [58778, 2.12483212, 0.38496514, 4.89625, 92.33961, 80.83593, '20200131.82371']);
    comets.set('408P/Novicho', [58177, 3.52380913, 0.26627275, 19.24538, 223.84488, 190.35075, '20221004.47038']);
    comets.set('409P/LONEOS-', [56836, 1.75101998, 0.71072113, 17.14459, 15.04481, 143.78175, '20210125.70808']);
    comets.set('410P/NEAT-LI', [59373, 3.24701039, 0.51038545, 9.39381, 313.09975, 139.98033, '20210623.58479']);
    comets.set('411P/Christe', [56565, 2.42763377, 0.58196518, 12.39395, 46.66631, 77.81818, '20070122.89188']);
    comets.set('412P/WISE', [56599, 1.61261548, 0.48090202, 8.93737, 155.96287, 0.85662, '20150614.00114']);
    comets.set('413P/Larson', [58114, 2.13983248, 0.42384113, 15.98412, 185.89847, 39.06317, '20210719.27013']);
    comets.set('414P/STEREO', [59228, 0.52636420, 0.81169143, 23.38406, 210.73648, 257.78861, '20210125.38622']);
    comets.set('415P/Tenagra', [58426, 3.31195304, 0.19516377, 31.78934, 346.45018, 160.32557, '20210216.16338']);
    comets.set('416P/Scotti', [57335, 2.18002473, 0.45572076, 3.36541, 134.66895, 355.80260, '20130207.53617']);
    comets.set('417P/NEOWISE', [58510, 1.49228616, 0.55459375, 8.12912, 129.39742, 111.35719, '20210421.91004']);
    comets.set('418P/LINEAR', [55962, 1.71575090, 0.66371734, 5.78039, 306.88750, 277.86290, '20100419.08837']);
    comets.set('419P/PANSTAR', [57888, 2.54215394, 0.27850479, 2.80444, 187.25750, 40.42491, '20150315.48866']);
    comets.set('420P/Hill', [56117, 2.79104662, 0.49456356, 14.44469, 157.78814, 174.09156, '20090702.79231']);
    comets.set('421P/McNaugh', [55899, 1.65025005, 0.67503810, 10.09365, 259.90273, 55.68014, '20090908.72410']);
    comets.set('422P/Christe', [56531, 3.09113793, 0.50627353, 39.59226, 306.00446, 36.07893, '20060528.79553']);
    comets.set('423P/Lemmon', [58945, 5.41872219, 0.12005820, 8.34858, 80.68555, 33.34589, '20210923.67342']);
    comets.set('424P/La_Sagr', [57510, 1.35198342, 0.69277912, 8.63778, 312.44591, 51.61999, '20120816.58385']);
    comets.set('425P/Kowalsk', [57929, 2.90122001, 0.54241137, 16.42902, 200.21603, 210.34541, '20210921.02385']);
    comets.set('426P/PANSTAR', [58561, 2.67543850, 0.16071938, 17.77382, 119.49132, 280.52281, '20180107.85360']);
    comets.set('427P/ATLAS', [58080, 2.17822414, 0.31304498, 11.84937, 99.94434, 252.39100, '20170728.02388']);
    comets.set('428P/Gibbs', [57998, 1.67561050, 0.51894918, 8.51408, 36.93515, 299.32211, '20141114.53023']);
    comets.set('429P/LINEAR-', [55322, 1.72296574, 0.50666674, 7.74861, 72.06398, 325.14910, '20081102.83639']);
    comets.set('430P/Scotti', [56799, 1.55441753, 0.49966940, 4.47448, 94.57183, 54.69189, '20160614.59283']);
    comets.set('431P/Scotti', [57963, 1.76200327, 0.48805174, 22.67187, 199.41952, 203.27005, '20150909.35797']);
    comets.set('432P/PANSTAR', [59211, 2.30021598, 0.24254187, 10.07005, 105.37977, 239.21436, '20210831.03423']);
    comets.set('434P/Tenagra', [58369, 3.02321867, 0.27146853, 6.31767, 126.90237, 289.00406, '20211023.89210']);
    comets.set('435P/PANSTAR', [58404, 2.05638705, 0.31859695, 18.88914, 244.36785, 98.56152, '20160430.65964']);
    comets.set('436P/Garradd', [55552, 1.92289301, 0.67191103, 20.20799, 283.03733, 87.41586, '20070927.76187']);
    comets.set('437P/Lemmon-', [57946, 3.40982997, 0.25224653, 3.69003, 206.63650, 245.89810, '20121124.34390']);
    comets.set('438P/Christe', [54147, 2.21052874, 0.42200967, 8.33902, 58.37036, 260.61686, '20050411.46074']);
    comets.set('439P/LINEAR', [55214, 1.64630594, 0.50983794, 6.95752, 337.64728, 59.10041, '20090123.96465']);
    comets.set('440P/Kobayas', [57000, 2.04623333, 0.76111623, 12.38013, 183.29723, 329.03244, '20220326.53061']);
    comets.set('441P/PANSTAR', [58275, 3.32721853, 0.19501236, 2.57312, 178.39648, 143.64801, '20170408.32401']);
    comets.set('442P/McNaugh', [58253, 2.32875655, 0.53149806, 6.05299, 310.98170, 32.03518, '20220821.16913']);
    comets.set('443P/PANSTAR', [59057, 2.95654514, 0.28464164, 19.88754, 144.97760, 108.96239, '20221009.43241']);
    comets.set('444P/WISE-PA', [59336, 1.47304243, 0.57044326, 22.12703, 170.87104, 89.41807, '20220710.31966']);
    comets.set('445P/Lemmon-', [58340, 2.38468429, 0.41235749, 1.08816, 213.73638, 126.54939, '20220819.46379']);
    comets.set('446P/McNaugh', [56955, 1.61612041, 0.64714796, 16.56533, 344.63508, 336.44977, '20120815.12680']);
    comets.set('447P/Sheppar', [57534, 4.66416813, 0.18078590, 7.41256, 95.23927, 302.85846, '20220803.90233']);
    comets.set('448P/PANSTAR', [58524, 2.10891475, 0.41901519, 12.15327, 219.04038, 161.78216, '20151009.13191']);
    comets.set('449P/Leonard', [59140, 1.87478190, 0.47898984, 15.45923, 176.65164, 242.57097, '20201123.60734']);
    comets.set('450P/LONEOS', [53385, 5.46276353, 0.30927904, 10.57073, 20.59582, 125.22954, '20040826.93888']);
    comets.set('451P/Christe', [54253, 2.79630375, 0.55836267, 26.49106, 186.98346, 301.04597, '20070117.89466']);
    comets.set('452P/Sheppar', [56715, 4.16857102, 0.42727076, 6.42755, 37.10283, 123.82870, '20230422.42491']);
    comets.set('D/1766_G1_(H', [-33800, 0.40603000, 0.84763000, 7.86500, 178.69900, 76.26300, '17660427.90900']);
    comets.set('D/1770_L1_(L', [-32236, 0.67444900, 0.78611900, 1.55170, 225.01610, 134.46730, '17700814.04090']);
    comets.set('D/1884_O1_(B', [9411, 1.27959820, 0.58359434, 5.47322, 301.05376, 6.75071, '18840816.97293']);
    comets.set('D/1886_K1_(B', [10055, 1.32529156, 0.57135963, 12.67160, 176.87728, 55.13569, '18860607.21092']);
    comets.set('D/1894_F1_(D', [12925, 1.14722005, 0.69843793, 5.52942, 46.39459, 85.70702, '18940209.95511']);
    comets.set('D/1895_Q1_(S', [13430, 1.29776300, 0.65201300, 2.99230, 167.78170, 171.75370, '18950821.31560']);
    comets.set('C/1905_F1_(G', [16952, 1.01098116, 0.20089805, 27.06107, 353.22754, 173.31710, '19050330.67820']);
    comets.set('C/1914_S1_(C', [20452, 0.67827537, 0.90383397, 76.85692, 265.27948, 2.40135, '19140803.13327']);
    comets.set('D/1918_W1_(S', [21932, 1.88306470, 0.46829128, 5.57198, 279.29065, 118.96400, '19180930.28894']);
    comets.set('C/1921_H1_(D', [22830, 1.11612247, 0.93473816, 22.34540, 97.48134, 67.12735, '19210505.38105']);
    comets.set('C/1942_EA_(V', [30406, 1.28707900, 0.93363900, 37.99610, 335.22290, 172.29060, '19420215.81950']);
    comets.set('D/1952_B1_(H', [34058, 1.66490665, 0.51432703, 16.35240, 343.03425, 128.47805, '19511030.37494']);
    comets.set('C/1960_Y1_(C', [37308, 1.04671865, 0.93033662, 151.17470, 138.76484, 177.29325, '19610210.96677']);
    comets.set('D/1977_C1_(S', [43197, 2.84975548, 0.25917112, 3.20139, 26.55078, 80.76838, '19760803.99405']);
    comets.set('D/1978_R1_(H', [43773, 1.10141886, 0.66523727, 5.94735, 240.46225, 132.25341, '19781009.49158']);
    comets.set('C/1989_A3_(B', [47551, 0.42051739, 0.97809250, 83.05927, 194.76998, 28.43781, '19881205.24441']);
    comets.set('C/1991_L3_(L', [48619, 0.98268434, 0.92885840, 19.19011, 41.47882, 329.43160, '19910708.19744']);
    comets.set('D/1993_F2-A_', [49480, 5.38056310, 0.21620917, 6.00329, 354.89352, 220.53766, '19940324.10320']);
    comets.set('P/1996_R2_(L', [50364, 2.60964242, 0.30999078, 2.60534, 334.04249, 40.24056, '19970119.18990']);
    comets.set('C/1998_G1_(L', [50924, 2.13337861, 0.82369261, 109.71473, 236.32232, 341.38366, '19981116.62434']);
    comets.set('P/1998_VS24_', [51149, 3.40541202, 0.24393087, 5.03099, 244.60476, 159.19714, '19981103.30544']);
    comets.set('C/1999_E1_(L', [51434, 3.92002618, 0.76010596, 46.88123, 329.76819, 127.83435, '19990131.78016']);
    comets.set('P/1999_J6_(S', [54119, 0.04885808, 0.98423420, 26.62914, 21.94708, 81.59825, '20041108.30721']);
    comets.set('C/1999_K4_(L', [51318, 1.44243673, 0.91645495, 120.77399, 8.79439, 241.47928, '19990516.45537']);
    comets.set('P/1999_RO28_', [51441, 1.23175886, 0.65078710, 8.19104, 219.85883, 148.45030, '19991002.34339']);
    comets.set('C/1999_S3_(L', [51475, 1.89494429, 0.89996276, 70.56091, 44.12816, 11.87820, '19991109.01565']);
    comets.set('C/1999_XS87_', [51552, 2.77183958, 0.84057497, 14.84641, 151.35453, 266.72936, '19990806.60454']);
    comets.set('P/1999_XN120', [51552, 3.28632082, 0.21390628, 5.02837, 161.77487, 285.46981, '20000501.33466']);
    comets.set('C/2000_D2_(L', [51604, 2.29760997, 0.86703438, 156.99193, 117.68268, 235.88715, '20000308.61382']);
    comets.set('C/2000_G2_(L', [51653, 2.71694167, 0.80953903, 170.47918, 101.76470, 328.38493, '20000206.21376']);
    comets.set('P/2000_R2_(L', [51807, 1.38996689, 0.58365455, 3.21634, 147.06349, 187.49943, '20000912.65770']);
    comets.set('C/2000_S3_(L', [51841, 2.66223179, 0.77228725, 25.16434, 298.27139, 41.15320, '20000716.30523']);
    comets.set('P/2001_H5_(N', [52032, 2.39664895, 0.60019118, 8.39927, 224.87831, 329.56306, '20010128.70125']);
    comets.set('C/2001_OG108', [52248, 0.99404789, 0.92526008, 80.24506, 116.41951, 10.55529, '20020315.20607']);
    comets.set('P/2001_Q6_(N', [52207, 1.40817678, 0.82385495, 56.85520, 43.32933, 22.13588, '20011109.46616']);
    comets.set('C/2001_W2_(B', [52248, 1.05106519, 0.94137478, 115.91308, 142.08579, 113.35585, '20011223.91831']);
    comets.set('C/2002_A1_(L', [52431, 4.71095665, 0.72578378, 14.05751, 18.90906, 81.80774, '20011127.55521']);
    comets.set('C/2002_A2_(L', [52383, 4.70708157, 0.72650481, 14.05493, 19.26464, 81.92882, '20011205.66590']);
    comets.set('C/2002_B1_(L', [52314, 2.27112942, 0.77101055, 51.02134, 76.15840, 58.18542, '20020420.00532']);
    comets.set('C/2002_CE10_', [52813, 2.04675939, 0.79148524, 145.45869, 126.18815, 147.44394, '20030622.09874']);
    comets.set('P/2002_EJ57_', [52357, 2.63550505, 0.59391002, 4.96968, 166.89189, 330.38348, '20011219.12340']);
    comets.set('C/2002_K4_(N', [52467, 2.76451734, 0.84228241, 94.06277, 24.43176, 308.09901, '20020712.97385']);
    comets.set('C/2002_R5_(S', [53575, 0.04740249, 0.98526098, 14.12093, 45.72754, 13.21445, '20020905.18423']);
    comets.set('P/2002_S7_(S', [53663, 0.04883902, 0.98484945, 13.57714, 52.16509, 50.19060, '20080704.82863']);
    comets.set('P/2002_T6_(N', [52848, 3.38709656, 0.55734533, 11.00931, 217.57612, 209.04586, '20030627.03138']);
    comets.set('C/2003_E1_(N', [52927, 3.24495877, 0.76358329, 33.53782, 103.85928, 137.06999, '20040213.60506']);
    comets.set('C/2003_F1_(L', [52790, 4.00779884, 0.80603402, 70.22151, 121.18813, 87.48765, '20030628.46008']);
    comets.set('P/2003_F2_(N', [52735, 2.97720655, 0.54224939, 11.60453, 191.59269, 359.02857, '20030414.78241']);
    comets.set('P/2003_QX29_', [52863, 4.23914606, 0.47178802, 11.39652, 37.22623, 264.58026, '20021026.21655']);
    comets.set('C/2003_R1_(L', [52926, 2.10188432, 0.89331449, 149.19563, 302.69011, 356.68906, '20030629.61701']);
    comets.set('P/2003_T12_(', [56072, 0.57480572, 0.77616614, 11.47515, 217.66883, 176.46572, '20120126.44658']);
    comets.set('C/2004_C1_(L', [53061, 4.35940769, 0.62315774, 28.91654, 316.14988, 151.95402, '20030319.64276']);
    comets.set('P/2004_DO29_', [53107, 4.09474936, 0.45151046, 14.53584, 41.85759, 147.86232, '20041011.66047']);
    comets.set('P/2004_FY140', [53133, 4.10610999, 0.17089421, 2.12778, 239.75766, 327.29384, '20040806.99558']);
    comets.set('P/2004_R3_(L', [53278, 2.14148791, 0.44181829, 7.97216, 5.29811, 318.80642, '20040524.49761']);
    comets.set('P/2004_V3_(S', [53377, 3.93829863, 0.44634092, 50.45271, 322.36477, 356.09295, '20041111.34099']);
    comets.set('P/2004_V5-A_', [53433, 4.41085189, 0.44520935, 19.35814, 87.68900, 47.85895, '20050228.73409']);
    comets.set('P/2004_V5-B_', [53425, 4.41090201, 0.44523652, 19.35822, 87.69260, 47.85966, '20050301.00140']);
    comets.set('P/2005_E1_(T', [53455, 4.44545813, 0.38473927, 5.15300, 170.79205, 4.41591, '20050318.24320']);
    comets.set('P/2005_J1_(M', [53526, 1.53014654, 0.57096069, 31.76595, 338.92293, 268.84121, '20050417.30633']);
    comets.set('P/2005_L1_(M', [53554, 3.14285393, 0.20923826, 7.73693, 149.55866, 138.32920, '20051213.09145']);
    comets.set('P/2005_S2_(S', [53616, 6.39803683, 0.19670978, 3.14105, 229.93318, 161.27240, '20060630.74214']);
    comets.set('P/2005_SB216', [54296, 3.81826545, 0.46320811, 24.09844, 83.56992, 1.69289, '20070211.30400']);
    comets.set('P/2005_T3_(R', [53667, 6.20246110, 0.17378534, 6.26309, 8.16490, 27.99579, '20060112.44144']);
    comets.set('P/2005_T4_(S', [53667, 0.64939978, 0.93035203, 160.03622, 41.44407, 25.42251, '20051010.53752']);
    comets.set('P/2005_T5_(B', [53673, 3.24680262, 0.55244475, 21.37239, 304.51419, 57.07098, '20051103.52184']);
    comets.set('C/2005_W2_(C', [53723, 3.33161972, 0.82445359, 11.26403, 111.67012, 336.61518, '20060327.39521']);
    comets.set('C/2006_F2_(C', [53825, 4.29645245, 0.65137027, 20.51122, 181.01134, 8.26072, '20060330.42662']);
    comets.set('P/2006_HR30_', [54046, 1.22642769, 0.84311855, 31.88450, 117.41388, 309.95216, '20070102.28216']);
    comets.set('C/2006_U7_(G', [54053, 4.42554238, 0.63067072, 7.23008, 12.89887, 57.76104, '20070328.05467']);
    comets.set('P/2007_C2_(C', [54357, 3.77948181, 0.46225029, 8.67470, 179.46576, 276.11745, '20070904.63742']);
    comets.set('P/2007_K2_(G', [54247, 2.26854743, 0.68395373, 7.61973, 345.67633, 189.85395, '20070608.43510']);
    comets.set('P/2007_Q2_(G', [54356, 1.83901602, 0.67122948, 10.23844, 163.15031, 172.24896, '20070823.88098']);
    comets.set('P/2007_S1_(Z', [54372, 2.49439113, 0.34338434, 5.97304, 245.42502, 141.61858, '20071206.83707']);
    comets.set('C/2007_S2_(L', [54609, 5.55792922, 0.55705659, 16.86305, 210.47048, 296.25315, '20080914.90949']);
    comets.set('P/2007_T2_(K', [54411, 0.69581735, 0.77500898, 9.89642, 358.55364, 3.99766, '20070919.02258']);
    comets.set('C/2008_E1_(C', [54811, 4.82890952, 0.54814862, 35.03768, 269.98883, 189.02251, '20080811.84430']);
    comets.set('P/2008_L2_(H', [54737, 2.31737848, 0.61381543, 25.86062, 141.31674, 217.98402, '20080818.60101']);
    comets.set('P/2008_O3_(B', [54706, 2.49726935, 0.69495599, 32.26987, 340.98359, 47.57267, '20080603.08324']);
    comets.set('C/2008_R3_(L', [54772, 1.90901619, 0.89635151, 43.23785, 84.16043, 270.55314, '20081122.49290']);
    comets.set('P/2008_Y3_(M', [54879, 4.43424428, 0.44766720, 38.81319, 238.27940, 262.93414, '20090111.96555']);
    comets.set('P/2008_Y12_(', [55493, 0.06537569, 0.97876170, 23.34537, 146.62207, 312.57474, '20081222.47320']);
    comets.set('P/2009_B1_(B', [54862, 2.42659220, 0.63719062, 22.22848, 128.59384, 297.43831, '20090206.20055']);
    comets.set('P/2009_O3_(H', [55082, 2.44997955, 0.68688005, 16.21753, 154.55220, 183.76387, '20090518.60439']);
    comets.set('P/2009_Q5_(M', [55113, 2.91851167, 0.60905285, 40.90482, 209.27492, 160.13986, '20090908.57673']);
    comets.set('P/2009_T2_(L', [55153, 1.75474955, 0.76899059, 28.10639, 215.47091, 215.98563, '20100112.84151']);
    comets.set('P/2009_WX51_', [55174, 0.79995638, 0.74029380, 9.59260, 118.01625, 31.75840, '20100131.07531']);
    comets.set('P/2009_Y2_(K', [55207, 2.33919281, 0.64052556, 29.92961, 171.96193, 262.12652, '20100330.69375']);
    comets.set('P/2010_A3_(H', [55254, 1.62182793, 0.73222953, 15.02826, 41.28187, 64.82907, '20100403.68111']);
    comets.set('P/2010_BN109', [59763, 2.27863835, 0.58252139, 27.06640, 70.81761, 42.89727, '20230303.00029']);
    comets.set('P/2010_C1_(S', [55264, 5.23490352, 0.25910909, 9.14247, 3.66592, 142.03416, '20091201.61244']);
    comets.set('P/2010_D2_(W', [55440, 3.65905350, 0.45302440, 57.17697, 120.06818, 319.83586, '20100305.16149']);
    comets.set('P/2010_E2_(J', [55288, 2.39873318, 0.72237010, 15.43700, 8.29456, 177.89937, '20100407.92645']);
    comets.set('P/2010_H2_(V', [55324, 3.10773440, 0.19290772, 14.25291, 130.12333, 64.30890, '20100309.35261']);
    comets.set('P/2010_H4_(S', [55321, 4.82093138, 0.27214711, 2.31429, 181.18895, 44.84660, '20100703.43528']);
    comets.set('P/2010_H5_(S', [55339, 6.02595108, 0.15644880, 14.08718, 175.12994, 24.89948, '20100417.70908']);
    comets.set('P/2010_J3_(M', [55356, 2.45511052, 0.72682274, 13.25508, 157.31246, 106.66119, '20100823.46382']);
    comets.set('P/2010_JC81_', [55908, 1.81082866, 0.77735065, 38.69027, 12.57331, 30.76805, '20110426.55384']);
    comets.set('C/2010_L5_(W', [55379, 0.79116945, 0.90421394, 147.04894, 214.76359, 206.47227, '20100423.16334']);
    comets.set('P/2010_T2_(P', [55512, 3.75359625, 0.32322085, 8.01078, 355.94177, 59.64930, '20110709.82568']);
    comets.set('P/2010_TO20_', [55832, 5.10532645, 0.08853301, 2.63909, 251.89344, 43.96556, '20080909.57976']);
    comets.set('P/2010_U1_(B', [55524, 4.90317180, 0.26111101, 8.24625, 88.99810, 281.39036, '20100328.40028']);
    comets.set('P/2010_UH55_', [55677, 2.76796763, 0.57513428, 8.66256, 221.61806, 235.26440, '20110510.36110']);
    comets.set('P/2010_WK_(L', [55583, 1.76517849, 0.69198663, 11.47913, 40.84999, 11.48827, '20101019.75403']);
    comets.set('P/2011_C2_(G', [55845, 5.38854772, 0.26847186, 10.91094, 160.56361, 12.20198, '20120107.90931']);
    comets.set('P/2011_FR143', [55779, 3.73542465, 0.45304897, 16.01360, 349.91698, 191.02263, '20110310.59887']);
    comets.set('C/2011_J3_(L', [55711, 1.45099223, 0.92583194, 114.71238, 27.84496, 21.51228, '20110124.38798']);
    comets.set('P/2011_JB15_', [55721, 5.01870995, 0.31873584, 19.14127, 110.92671, 153.76818, '20120121.67112']);
    comets.set('C/2011_L1_(M', [55734, 2.24237371, 0.79679852, 65.51268, 294.47066, 252.36385, '20101218.30205']);
    comets.set('P/2011_N1_(A', [55925, 2.85771748, 0.54594610, 35.66888, 331.05619, 77.69051, '20120531.28652']);
    comets.set('P/2011_NO1_(', [55757, 1.24096903, 0.77898419, 15.38420, 263.44652, 296.11390, '20110120.19808']);
    comets.set('P/2011_P1_(M', [55793, 4.95216452, 0.36688593, 6.30880, 342.11981, 10.08177, '20100724.16729']);
    comets.set('C/2011_P2_(P', [55966, 6.14810496, 0.36981923, 8.98964, 76.38463, 204.01852, '20100913.51439']);
    comets.set('P/2011_S1_(G', [56448, 6.89403371, 0.20315224, 2.67939, 193.36745, 218.89589, '20140824.03061']);
    comets.set('C/2011_S2_(K', [55857, 1.11512035, 0.93161485, 17.57254, 192.18998, 288.07032, '20111026.34777']);
    comets.set('P/2011_UA134', [55886, 2.05151000, 0.63270081, 10.53949, 32.32198, 40.63822, '20111207.19425']);
    comets.set('P/2011_V1_(B', [55867, 1.70932446, 0.55536395, 7.39820, 259.54317, 60.08355, '20110511.91852']);
    comets.set('P/2011_W1_(P', [55934, 3.31206074, 0.28865156, 3.71861, 282.47285, 161.88372, '20120122.53918']);
    comets.set('P/2011_Y2_(B', [55923, 1.78714781, 0.71292045, 6.35140, 131.18761, 310.01839, '20120321.69601']);
    comets.set('C/2011_Y3_(B', [55927, 3.49784319, 0.70491483, 26.51685, 340.67991, 84.80260, '20110822.93867']);
    comets.set('P/2012_B1_(P', [56328, 3.82515252, 0.41050358, 7.62778, 162.18301, 36.19418, '20130723.14372']);
    comets.set('C/2012_BJ98_', [56027, 2.15657774, 0.87364959, 2.63689, 72.96983, 124.03175, '20120920.43592']);
    comets.set('P/2012_C3_(P', [55974, 3.62489149, 0.62652717, 9.18987, 344.85161, 135.44127, '20111005.41596']);
    comets.set('P/2012_F2_(P', [56292, 2.89706759, 0.54223975, 14.72469, 33.19284, 227.13516, '20130410.01552']);
    comets.set('P/2012_G1_(P', [56033, 2.79469382, 0.32992923, 12.17131, 265.75186, 283.39532, '20120321.51070']);
    comets.set('C/2012_H2_(M', [56065, 1.71677218, 0.89360944, 92.83559, 295.90198, 184.13595, '20120503.73181']);
    comets.set('P/2012_K3_(G', [56094, 2.07686235, 0.42596008, 13.20117, 172.30057, 125.88132, '20120930.33132']);
    comets.set('P/2012_NJ_(L', [56158, 1.29189011, 0.84806204, 84.37546, 338.41391, 315.76319, '20120613.09028']);
    comets.set('P/2012_O1_(M', [56162, 1.49914553, 0.57924394, 11.42858, 222.10989, 111.27896, '20120723.90654']);
    comets.set('P/2012_O2_(M', [56139, 1.66083418, 0.53827101, 24.52745, 183.04739, 120.81358, '20120625.09944']);
    comets.set('P/2012_T2_(P', [56218, 4.82143122, 0.15962391, 12.56239, 309.59733, 73.73623, '20130412.96147']);
    comets.set('P/2012_T3_(P', [56215, 2.38387426, 0.60453490, 9.50971, 196.80253, 114.25970, '20120427.93005']);
    comets.set('C/2012_T6_(K', [56234, 1.77508700, 0.87633751, 33.27550, 198.09865, 186.22046, '20120826.38536']);
    comets.set('P/2012_U2_(P', [56245, 3.62778506, 0.50656873, 10.53448, 229.53488, 186.86307, '20121204.26920']);
    comets.set('P/2012_US27_', [56294, 1.82084321, 0.64858008, 39.29294, 1.27045, 49.20658, '20130208.55880']);
    comets.set('P/2012_WA34_', [56238, 3.17320144, 0.34025017, 6.11670, 353.24248, 94.52891, '20130125.17454']);
    comets.set('C/2012_X2_(P', [56422, 4.74815804, 0.77049741, 34.12391, 215.63114, 271.02329, '20130331.31340']);
    comets.set('P/2013_AL76_', [56309, 2.04746972, 0.68388650, 144.85857, 27.20090, 145.93762, '20121213.32563']);
    comets.set('C/2013_C2_(T', [57165, 9.13100489, 0.43132046, 21.33994, 308.75555, 247.52168, '20150829.40040']);
    comets.set('C/2013_D1_(H', [56377, 2.46012911, 0.78087861, 10.09356, 252.63150, 294.97488, '20130413.72046']);
    comets.set('P/2013_G1_(K', [56667, 3.35309823, 0.51239143, 5.46862, 51.23986, 221.48407, '20131210.95743']);
    comets.set('P/2013_G4_(P', [56407, 2.61319364, 0.41041543, 5.92561, 214.39094, 339.77284, '20130209.68771']);
    comets.set('P/2013_J2_(M', [56553, 2.14783021, 0.65614970, 15.49556, 37.88934, 289.39351, '20130822.99821']);
    comets.set('P/2013_N3_(P', [56503, 3.02887749, 0.59242870, 2.17041, 323.94961, 17.68058, '20140211.77415']);
    comets.set('P/2013_N5_(P', [56516, 1.82304916, 0.73191499, 23.24248, 176.24255, 187.74603, '20130702.44044']);
    comets.set('P/2013_P1_(P', [56525, 3.39023740, 0.60522864, 18.70201, 138.10883, 160.79518, '20130226.08835']);
    comets.set('C/2013_P4_(P', [56851, 5.96705304, 0.59605993, 4.26437, 113.55903, 256.61456, '20140812.39264']);
    comets.set('P/2013_R3_(C', [56578, 2.20360700, 0.27344549, 0.89890, 8.23878, 342.68392, '20130805.16023']);
    comets.set('P/2013_R3-A_', [56675, 2.20380351, 0.27332154, 0.89800, 8.32792, 342.64198, '20130805.29116']);
    comets.set('P/2013_R3-B_', [56662, 2.20392327, 0.27333771, 0.89962, 8.28380, 342.69711, '20130805.31885']);
    comets.set('P/2013_T1_(P', [56573, 2.21049540, 0.62326867, 24.21024, 345.84001, 10.28383, '20130731.26525']);
    comets.set('P/2013_T2_(S', [56596, 1.59962000, 0.52849640, 9.35215, 342.52177, 2.62985, '20130620.68458']);
    comets.set('C/2013_U1_(C', [56596, 2.41880665, 0.79716890, 23.94166, 143.14220, 211.25143, '20131118.72472']);
    comets.set('C/2013_V3_(N', [56629, 1.38669394, 0.89097069, 32.13453, 339.64336, 100.91815, '20131029.90587']);
    comets.set('P/2013_W1_(P', [56648, 1.41561286, 0.59388126, 4.69950, 1.32712, 117.85601, '20140308.17583']);
    comets.set('C/2013_W2_(P', [57042, 4.44443922, 0.57470690, 4.56706, 307.19793, 179.84280, '20150105.25740']);
    comets.set('P/2013_YG46_', [56686, 1.81524254, 0.45164645, 8.21914, 232.79658, 56.86808, '20170119.53700']);
    comets.set('P/2014_A2_(H', [56676, 2.07467480, 0.64983414, 24.51348, 356.22638, 106.67202, '20131028.33788']);
    comets.set('P/2014_A3_(P', [56715, 3.54690579, 0.24174977, 13.66992, 213.15474, 230.59424, '20130418.19374']);
    comets.set('P/2014_C1_(T', [56698, 1.68573153, 0.44611707, 2.67962, 23.99851, 167.86823, '20131218.95615']);
    comets.set('C/2014_F3_(S', [59038, 5.70727373, 0.64417804, 6.55359, 2.66826, 326.85924, '20210516.07858']);
    comets.set('C/2014_J1_(C', [56794, 1.70854149, 0.80239339, 159.69647, 195.48003, 41.94213, '20140620.01549']);
    comets.set('P/2014_L2_(N', [56905, 2.23454180, 0.64676281, 5.18441, 182.77795, 149.40584, '20140715.41733']);
    comets.set('P/2014_L3_(H', [56858, 1.85396305, 0.77309415, 6.26406, 178.60991, 115.56637, '20140628.57151']);
    comets.set('P/2014_M4_(P', [56916, 2.35145680, 0.59553911, 3.34516, 145.27040, 265.06227, '20141227.58518']);
    comets.set('P/2014_MG4_(', [57099, 3.71314060, 0.25918614, 9.36875, 298.76879, 311.85375, '20130613.01088']);
    comets.set('P/2014_O3_(P', [56855, 4.64061970, 0.38501995, 7.80657, 204.36437, 87.70408, '20140417.55082']);
    comets.set('C/2014_OG392', [58250, 9.96507733, 0.18083548, 9.04112, 254.42450, 145.85013, '20211211.81383']);
    comets.set('C/2014_TG64_', [56953, 3.23906813, 0.78246133, 22.28307, 294.77591, 50.28973, '20140526.00453']);
    comets.set('P/2014_U4_(P', [56957, 1.84341691, 0.47100403, 6.45699, 347.73010, 12.04542, '20140803.92566']);
    comets.set('P/2014_V1_(P', [56974, 2.56372018, 0.52646548, 22.46119, 178.03298, 166.30303, '20150121.66335']);
    comets.set('P/2014_W1_(P', [56992, 2.66220575, 0.39630055, 8.80911, 150.35823, 247.24872, '20140801.11401']);
    comets.set('P/2014_W4_(P', [57279, 4.26109048, 0.35307752, 15.27435, 67.41179, 33.35259, '20151229.50336']);
    comets.set('C/2014_W7_(C', [57002, 1.48825927, 0.86930062, 98.31375, 33.24016, 151.26100, '20141231.62199']);
    comets.set('C/2014_W9_(P', [57051, 1.58745527, 0.85784434, 10.63053, 167.76944, 21.28862, '20150215.70580']);
    comets.set('C/2014_W11_(', [57174, 3.42680652, 0.65023088, 12.70662, 225.64480, 295.94238, '20150617.37101']);
    comets.set('P/2014_X1_(E', [57046, 1.81487841, 0.71000552, 25.97139, 34.36800, 61.56935, '20150107.74149']);
    comets.set('C/2015_A1_(P', [57110, 1.99550487, 0.90081449, 80.36575, 244.87930, 341.08597, '20150313.05697']);
    comets.set('P/2015_A3_(P', [57067, 1.15292945, 0.84590960, 172.51066, 249.61992, 277.07516, '20150222.87482']);
    comets.set('P/2015_B1_(P', [57101, 5.97563790, 0.38244499, 18.02773, 188.27400, 353.35566, '20150919.72672']);
    comets.set('P/2015_B4_(L', [57346, 3.75533741, 0.56891192, 1.74262, 227.77853, 266.65108, '20150217.65116']);
    comets.set('P/2015_C1_(T', [57093, 2.89267455, 0.56245006, 13.87756, 178.41493, 348.86208, '20150501.29132']);
    comets.set('C/2015_D1_(S', [57073, 0.02832231, 0.99432307, 69.61562, 234.95541, 95.88103, '20150219.74833']);
    comets.set('C/2015_D2_(P', [57105, 5.60604947, 0.56825603, 31.83435, 291.92312, 162.85895, '20130927.61656']);
    comets.set('C/2015_D5_(K', [57087, 4.57734295, 0.49964849, 20.39980, 40.17533, 74.57827, '20140417.07369']);
    comets.set('P/2015_D6_(L', [57104, 4.56365009, 0.36956735, 20.18385, 125.57210, 46.35101, '20150714.13666']);
    comets.set('C/2015_F5_(S', [57134, 0.34600383, 0.97774875, 149.25665, 13.39324, 287.73968, '20150328.09962']);
    comets.set('C/2015_GX_(P', [57278, 1.97175344, 0.87819882, 90.25453, 108.95792, 235.51550, '20150826.66188']);
    comets.set('P/2015_HG16_', [57331, 3.12900839, 0.34564598, 18.86878, 47.98878, 59.36482, '20140627.42185']);
    comets.set('P/2015_K5_(P', [57185, 2.98613272, 0.55395709, 39.98728, 105.99479, 134.26904, '20150606.37382']);
    comets.set('P/2015_M2_(P', [57418, 5.91278265, 0.17907655, 3.97386, 224.78693, 86.61134, '20150831.13438']);
    comets.set('P/2015_P4_(P', [57286, 2.52516188, 0.58423891, 8.71376, 280.81681, 104.74692, '20160119.03180']);
    comets.set('P/2015_PD229', [57316, 4.83188882, 0.32673631, 2.02688, 352.37127, 342.77360, '20150814.22329']);
    comets.set('P/2015_Q2_(P', [57276, 1.81912039, 0.75436589, 146.20216, 244.40792, 228.24477, '20150910.33923']);
    comets.set('C/2015_R1_(P', [57313, 2.16545865, 0.63286160, 22.66833, 300.53771, 48.51408, '20150625.76693']);
    comets.set('P/2015_R2_(P', [57278, 2.47355841, 0.45202974, 15.55167, 149.64858, 168.66825, '20150608.20023']);
    comets.set('P/2015_T3_(P', [57307, 2.16970370, 0.46473897, 12.22003, 196.60451, 119.88923, '20150310.08703']);
    comets.set('P/2015_TO19_', [57329, 2.92547589, 0.35898061, 6.49988, 89.28272, 321.65039, '20160306.97942']);
    comets.set('P/2015_TP200', [57708, 3.38530742, 0.53612967, 8.77229, 82.73561, 6.97544, '20161028.20278']);
    comets.set('C/2015_V4_(P', [57465, 5.45962783, 0.70560176, 60.75131, 306.90712, 179.89633, '20160827.99460']);
    comets.set('P/2015_W2_(C', [57361, 2.67833571, 0.63410542, 11.61121, 117.62651, 294.24729, '20150930.89156']);
    comets.set('C/2015_X2_(C', [57368, 1.90455540, 0.87907924, 72.45848, 42.01818, 101.09412, '20151220.71748']);
    comets.set('P/2015_X3_(P', [57357, 2.82213342, 0.43815744, 24.37205, 306.89173, 77.33341, '20150807.84347']);
    comets.set('C/2015_X4_(E', [57419, 3.39468606, 0.81280434, 29.50492, 176.32917, 262.63581, '20151103.46831']);
    comets.set('P/2015_X6_(P', [57378, 2.28733828, 0.16962315, 4.55814, 329.02181, 107.11195, '20160318.64147']);
    comets.set('C/2015_X8_(N', [57409, 1.19027258, 0.93911400, 155.28170, 20.40053, 191.11187, '20151023.12420']);
    comets.set('C/2015_YG1_(', [57423, 2.07341137, 0.87923622, 57.33604, 102.79176, 350.51186, '20150928.97159']);
    comets.set('P/2016_A2_(C', [57395, 3.44646101, 0.27391232, 26.77972, 139.87606, 291.73787, '20150616.98966']);
    comets.set('P/2016_A3_(P', [57890, 4.78950344, 0.38019712, 8.59388, 338.48636, 187.79459, '20170413.73017']);
    comets.set('P/2016_A7_(P', [57465, 2.17664918, 0.56662578, 16.63747, 352.46958, 221.46609, '20160225.86219']);
    comets.set('P/2016_BA14_', [57490, 1.00857687, 0.66626578, 18.91891, 351.89650, 180.53406, '20160315.51712']);
    comets.set('P/2016_G1_(P', [57508, 2.04049441, 0.21010208, 10.96784, 111.28002, 204.07472, '20170126.19436']);
    comets.set('P/2016_J1-A_', [57560, 2.44801173, 0.22826284, 14.33019, 46.58538, 199.85628, '20160624.21335']);
    comets.set('P/2016_J1-B_', [57539, 2.44805611, 0.22822993, 14.33113, 46.58076, 199.85550, '20160624.12954']);
    comets.set('P/2016_P1_(P', [57606, 2.27918470, 0.29419825, 25.70655, 267.53680, 319.53677, '20150908.30285']);
    comets.set('C/2016_Q4_(K', [57635, 7.08354038, 0.57819846, 7.25666, 99.49889, 271.32840, '20180128.52706']);
    comets.set('P/2016_R4_(G', [57653, 2.80053127, 0.47506023, 10.86209, 174.05869, 168.34686, '20160720.50099']);
    comets.set('C/2016_S1_(P', [57699, 2.41190766, 0.70884778, 94.68967, 273.61128, 227.53822, '20170316.81238']);
    comets.set('P/2016_WM48_', [57760, 1.74806960, 0.78670061, 117.54767, 35.85684, 59.87448, '20170226.78569']);
    comets.set('P/2017_B4_(P', [57787, 2.81704306, 0.35772410, 20.18345, 16.17586, 121.54765, '20170127.05753']);
    comets.set('C/2017_C1_(N', [57818, 1.50175493, 0.92781552, 65.75224, 110.20432, 357.45719, '20170118.94637']);
    comets.set('P/2017_D1_(F', [57601, 2.68779771, 0.44033406, 20.73265, 7.25741, 82.33566, '20160628.29362']);
    comets.set('P/2017_D4_(P', [57818, 2.75461548, 0.62891585, 10.33959, 209.79628, 266.10414, '20160906.63738']);
    comets.set('P/2017_G1_(P', [57846, 2.62103340, 0.66121128, 3.53393, 218.55207, 259.35669, '20160514.06470']);
    comets.set('P/2017_G2_(P', [57889, 2.84625306, 0.65031280, 47.90624, 105.93913, 79.81963, '20170613.91413']);
    comets.set('P/2017_K3_(G', [57908, 2.33420906, 0.58118013, 4.27907, 253.20925, 354.32834, '20170531.49000']);
    comets.set('P/2017_P1_(P', [57994, 5.43811668, 0.30846643, 7.70155, 122.27098, 221.39384, '20180618.58402']);
    comets.set('C/2017_S2_(P', [58036, 3.61450815, 0.82311096, 12.68335, 305.97288, 62.42779, '20170829.33932']);
    comets.set('P/2017_S8_(P', [58045, 1.68299145, 0.39352874, 29.85108, 254.56696, 191.80225, '20180128.64545']);
    comets.set('P/2017_S9_(P', [58037, 2.19518331, 0.30451798, 14.13799, 237.90150, 146.21586, '20170723.56997']);
    comets.set('P/2017_TW13_', [58218, 2.07880362, 0.70976333, 44.83635, 120.10882, 322.27765, '20180620.98535']);
    comets.set('P/2017_U3_(P', [57992, 4.44340639, 0.09998087, 15.90844, 297.45832, 165.15000, '20190421.83743']);
    comets.set('C/2017_U5_(P', [58082, 4.32673670, 0.74456954, 18.95655, 262.15077, 163.11537, '20171219.10831']);
    comets.set('C/2017_W2_(L', [58113, 3.95732700, 0.71125672, 98.17929, 169.15771, 312.80906, '20171101.93772']);
    comets.set('P/2017_W3_(G', [58150, 3.83729668, 0.50387336, 18.31672, 326.46405, 210.75346, '20180225.09114']);
    comets.set('P/2017_Y3_(L', [58169, 1.27538085, 0.87071088, 27.58565, 67.52879, 153.87391, '20180211.25987']);
    comets.set('P/2018_A4_(P', [58143, 2.40256894, 0.80442660, 3.14804, 356.13605, 97.63436, '20180518.80660']);
    comets.set('P/2018_A5_(P', [58098, 2.69382123, 0.52304780, 23.57703, 359.67951, 87.82972, '20170923.82256']);
    comets.set('C/2018_A6_(G', [58788, 3.01779482, 0.80345403, 76.95477, 264.53420, 340.38634, '20190714.29293']);
    comets.set('P/2018_C1_(L', [58178, 2.59575855, 0.53445831, 5.13351, 234.32913, 270.44944, '20180225.56627']);
    comets.set('C/2018_EN4_(', [58248, 1.44795004, 0.92141480, 81.56200, 35.01112, 136.16515, '20180607.77813']);
    comets.set('P/2018_H2_(P', [58234, 2.02708977, 0.54004634, 7.38885, 120.22963, 68.45588, '20180123.45944']);
    comets.set('P/2018_L1_(P', [58296, 1.88560275, 0.48334667, 10.59322, 17.89090, 268.62959, '20181112.52702']);
    comets.set('P/2018_L4_(P', [58298, 1.67623419, 0.66033053, 26.62548, 140.43257, 145.19304, '20180731.84313']);
    comets.set('P/2018_L5_(L', [58354, 2.30342490, 0.36449764, 2.20915, 93.65091, 219.15869, '20180504.51843']);
    comets.set('C/2018_M1_(C', [58346, 1.30347953, 0.93870003, 37.25702, 14.13279, 339.46331, '20180710.02444']);
    comets.set('P/2018_P3_(P', [58398, 1.75646852, 0.41589651, 8.90933, 305.88751, 59.20921, '20181009.46525']);
    comets.set('P/2018_P4_(P', [58374, 3.66614226, 0.44931114, 23.11276, 8.11555, 353.11035, '20181107.34580']);
    comets.set('C/2018_P5_(P', [58531, 4.57588174, 0.64088887, 7.25684, 131.63427, 216.24126, '20190226.21697']);
    comets.set('C/2018_S2_(T', [58219, 5.47061872, 0.61491477, 64.22044, 290.68350, 85.12592, '20181105.19323']);
    comets.set('P/2018_VN2_(', [58421, 2.12260270, 0.47766483, 18.24013, 138.77334, 226.54885, '20180605.37791']);
    comets.set('P/2018_V5_(T', [58331, 4.70764296, 0.47462980, 10.58019, 260.80560, 171.32844, '20181003.86461']);
    comets.set('C/2018_X3_(P', [58462, 2.69891742, 0.78271953, 43.36964, 359.83448, 78.92476, '20181230.79996']);
    comets.set('P/2018_Y2_(A', [58494, 3.89325336, 0.47934818, 11.68035, 162.49862, 297.26491, '20190102.59844']);
    comets.set('P/2019_A1_(P', [58501, 2.21166720, 0.56892834, 13.74362, 150.84675, 312.29950, '20181011.04282']);
    comets.set('P/2019_A2_(A', [58523, 3.54290247, 0.38199370, 14.85526, 324.22625, 139.46264, '20181121.44876']);
    comets.set('P/2019_A3_(P', [58852, 2.31294887, 0.26518544, 15.36507, 325.48049, 31.32308, '20180801.87806']);
    comets.set('P/2019_A4_(P', [58501, 2.37928790, 0.08960737, 13.31890, 341.83647, 119.30012, '20181205.22492']);
    comets.set('P/2019_A6_(L', [58488, 1.93850612, 0.63917742, 33.22833, 156.30500, 280.27189, '20180829.30926']);
    comets.set('P/2019_A8_(P', [58498, 1.87257526, 0.42740805, 2.96666, 20.38252, 127.88815, '20180830.71073']);
    comets.set('P/2019_B2_(G', [58543, 2.41651739, 0.37290156, 16.82915, 358.70992, 176.45930, '20190608.02767']);
    comets.set('C/2019_F2_(A', [58611, 2.23288169, 0.86506972, 19.18865, 10.95403, 175.86792, '20190908.89322']);
    comets.set('P/2019_GG21_', [58576, 3.93220659, 0.47404777, 6.07697, 208.79259, 340.58404, '20190512.85679']);
    comets.set('C/2019_L1_(P', [58675, 2.89022698, 0.70661986, 9.99356, 49.91966, 254.40971, '20190811.28579']);
    comets.set('P/2019_LD2_(', [59087, 4.57797914, 0.13398658, 11.56398, 123.44985, 179.68196, '20200409.85055']);
    comets.set('P/2019_LM4_(', [58962, 2.37161122, 0.58520495, 36.39476, 68.37085, 72.85837, '20190618.23869']);
    comets.set('P/2019_M2_(A', [58706, 1.06339507, 0.64853146, 12.28206, 332.52049, 307.60332, '20190622.66767']);
    comets.set('P/2019_S2_(P', [58738, 3.75525291, 0.20666395, 10.47299, 216.74495, 93.12371, '20190220.83138']);
    comets.set('P/2019_S3_(P', [58759, 1.80678123, 0.47064656, 8.69261, 212.95017, 150.17041, '20190826.09622']);
    comets.set('C/2019_T5_(A', [58790, 1.52888930, 0.80920592, 33.42239, 189.61726, 247.69637, '20190801.14305']);
    comets.set('P/2019_T6_(P', [58799, 2.05192712, 0.62222327, 18.69702, 328.90972, 71.31095, '20191107.75953']);
    comets.set('P/2019_U4_(P', [58775, 1.84712922, 0.47518301, 11.69229, 180.96022, 200.04061, '20190918.36017']);
    comets.set('P/2019_V2_(G', [59056, 5.02065321, 0.33232040, 11.80118, 336.04625, 189.18428, '20201020.21430']);
    comets.set('P/2019_W1_(P', [58749, 3.33987954, 0.26602267, 23.46187, 18.74864, 35.42597, '20190507.99892']);
    comets.set('P/2019_X1_(P', [58634, 4.30551254, 0.30260697, 10.24654, 36.92927, 43.72771, '20190722.41090']);
    comets.set('P/2019_X2_(P', [58845, 1.82413149, 0.49925561, 15.88161, 213.55883, 250.85682, '20191209.31217']);
    comets.set('P/2019_Y3_(C', [58846, 0.91199935, 0.69578307, 24.63522, 2.26673, 139.38269, '20191213.45953']);
    comets.set('P/2020_A4_(P', [58882, 2.84251399, 0.65370445, 24.99030, 144.88305, 312.42962, '20191122.72278']);
    comets.set('P/2020_B4_(S', [59106, 6.43932207, 0.19236120, 11.60225, 342.44185, 185.99637, '20211125.03782']);
    comets.set('P/2020_G1_(P', [58973, 0.50576388, 0.85961155, 18.47273, 207.63759, 240.10550, '20200317.40778']);
    comets.set('P/2020_K9_(L', [59082, 2.84953746, 0.32212437, 23.20261, 196.83470, 166.24220, '20210211.62915']);
    comets.set('P/2020_M1_(P', [59022, 2.66093819, 0.47696346, 8.63283, 67.86592, 142.95192, '20191221.15455']);
    comets.set('P/2020_MK4_(', [59800, 6.11706061, 0.01148591, 6.80927, 119.38931, 0.69564, '20280523.28265']);
    comets.set('P/2020_O1_(L', [59069, 2.32926733, 0.11981850, 5.22320, 104.86406, 175.98943, '20200503.89920']);
    comets.set('P/2020_O3_(P', [59079, 4.16730326, 0.10610484, 8.44283, 81.17149, 266.89746, '20210127.52339']);
    comets.set('C/2020_P4-B', [59068, 0.09261308, 0.90920918, 28.14731, 171.60649, 173.42679, '20200808.08488']);
    comets.set('C/2020_P4-C', [59069, 0.08423821, 0.93942052, 37.55936, 116.42172, 165.25692, '20200806.83610']);
    comets.set('C/2020_Q2_(P', [59071, 5.40181832, 0.50546758, 3.30997, 118.51342, 179.95743, '20200207.07922']);
    comets.set('P/2020_R5_(P', [59034, 3.41304836, 0.31447817, 11.45435, 82.30844, 272.96859, '20200528.12517']);
    comets.set('P/2020_S1_(P', [59102, 2.94736224, 0.50722330, 13.73388, 254.86619, 129.45852, '20210116.88449']);
    comets.set('C/2020_S2_(P', [59137, 1.75605624, 0.82748820, 22.39783, 202.26304, 197.68536, '20201221.93576']);
    comets.set('P/2020_S5_(P', [59136, 2.67865526, 0.33831667, 12.35413, 52.99851, 316.00013, '20200808.31673']);
    comets.set('P/2020_S7_(P', [59121, 2.96101704, 0.41057912, 16.09182, 40.39731, 328.01823, '20201118.03554']);
    comets.set('P/2020_T3_(P', [59185, 1.43661503, 0.59149152, 7.29576, 357.04270, 74.02088, '20210120.47227']);
    comets.set('P/2020_U2_(P', [59226, 1.84882498, 0.51048764, 6.42098, 84.64493, 342.90152, '20201225.69911']);
    comets.set('P/2020_V3_(P', [59184, 6.23027585, 0.25476700, 23.03364, 249.34497, 198.29017, '20210209.12447']);
    comets.set('P/2020_V4_(R', [59331, 5.14858745, 0.44879015, 14.24339, 256.99893, 203.51151, '20210717.98484']);
    comets.set('P/2020_W1_(R', [59161, 5.28762661, 0.26491783, 10.79209, 264.77129, 124.25722, '20200404.17104']);
    comets.set('P/2020_WJ5_(', [59503, 4.98705874, 0.17130051, 22.29232, 338.42116, 177.81075, '20210703.38632']);
    comets.set('P/2020_X1_(A', [59190, 2.87178893, 0.36523757, 31.70372, 323.20395, 56.02828, '20200720.09862']);
    comets.set('C/2020_X2_(A', [59215, 3.82850805, 0.76627236, 18.19170, 347.35227, 105.45878, '20201115.86214']);
    comets.set('P/2021_A5_(P', [59223, 2.62093885, 0.13980950, 18.18794, 61.02465, 328.75654, '20201111.15613']);
    comets.set('P/2021_C2_(P', [59292, 4.89028847, 0.48743656, 21.92691, 78.82351, 66.49830, '20210224.64028']);
    comets.set('P/2021_HS_(P', [59398, 0.79644584, 0.81016790, 12.17140, 46.08620, 262.39586, '20210806.39070']);
    comets.set('P/2021_J3_(A', [59393, 4.90575987, 0.45072184, 14.57252, 125.66904, 111.24038, '20190703.51975']);
    comets.set('C/2021_K1_(A', [59445, 2.49783183, 0.80399384, 16.27607, 184.30382, 140.90566, '20210504.57679']);
    comets.set('P/2021_L2_(L', [59421, 1.93855003, 0.52175163, 21.06898, 51.53865, 266.67574, '20210724.54557']);
    comets.set('P/2021_L4_(P', [59438, 2.78931067, 0.11871019, 16.96163, 234.66019, 243.22488, '20190904.36626']);
    comets.set('P/2021_N1_(Z', [59402, 0.96214666, 0.67679260, 11.50561, 21.18977, 301.15845, '20210606.55415']);
    comets.set('P/2021_N2_(F', [59559, 3.79656240, 0.45240827, 13.06278, 177.34356, 221.74243, '20211113.29086']);
    comets.set('P/2021_P3_(P', [59466, 2.91627064, 0.34045415, 27.15584, 334.23815, 358.23711, '20210531.04824']);
    comets.set('P/2021_Q5_(A', [59474, 1.23453101, 0.62423911, 10.73438, 180.89023, 239.77612, '20210830.42843']);
    comets.set('P/2021_R1_(P', [59632, 4.88558276, 0.41891350, 5.52110, 220.34297, 143.40644, '20211217.81300']);
    comets.set('P/2021_R3_(P', [59454, 2.52555189, 0.33193059, 19.93310, 3.01861, 304.25276, '20210527.16591']);
    comets.set('P/2021_R4_(W', [59481, 2.32599268, 0.58615107, 21.04011, 56.62447, 321.25629, '20211013.92032']);
    comets.set('P/2021_R5_(R', [59499, 3.32271799, 0.30755196, 7.85202, 167.33231, 219.96453, '20220111.96750']);
    comets.set('P/2021_R6_(G', [59486, 2.55210526, 0.59323774, 34.92611, 220.71967, 176.11397, '20211031.85613']);
    comets.set('P/2021_R8_(S', [59473, 2.13097797, 0.29404210, 2.20305, 190.79388, 167.02532, '20211007.51477']);
    comets.set('P/2021_U1_(W', [59544, 2.44498319, 0.71275870, 30.56065, 145.04426, 246.78946, '20210930.97580']);
    comets.set('P/2021_U3_(A', [59542, 1.88680055, 0.54990855, 69.96297, 335.20849, 75.11308, '20211024.85667']);
    comets.set('P/2021_V2_(F', [59627, 3.49646695, 0.61326993, 12.69592, 259.83801, 232.29274, '20230121.53483']);
    comets.set('P/2022_B1_(W', [59596, 1.89670729, 0.65283630, 10.99090, 325.48210, 148.84979, '20220225.33980']);
    comets.set('P/2022_C1_(P', [59611, 3.98561325, 0.44760714, 4.76229, 9.37697, 113.14835, '20211104.59015']);
    comets.set('P/2022_C2_(P', [59687, 3.37040262, 0.44281959, 9.97974, 89.30365, 135.27423, '20220806.60936']);
    comets.set('P/2022_C3_(P', [59690, 4.37451462, 0.54696328, 12.81588, 93.94158, 139.06093, '20220701.26979']);
    comets.set('P/2022_D1_(P', [59647, 3.35256070, 0.54702589, 44.06403, 88.71250, 47.96584, '20210828.08513']);
    comets.set('P/2022_L3_(A', [59847, 2.41986633, 0.62832423, 21.54174, 10.32961, 29.80456, '20221029.96152']);
    comets.set('P/2022_M1_(L', [59812, 2.06143121, 0.57843542, 7.02704, 4.46804, 322.92164, '20220802.37823']);
    comets.set('P/2022_O2_(P', [59834, 1.75674906, 0.72166220, 9.42597, 48.64869, 330.49978, '20230107.12483']);
    comets.set('C/2022_P1_(N', [59838, 1.59515414, 0.91347589, 154.60618, 249.93642, 205.08086, '20221128.47804']);
    comets.set('P/2022_P2_(Z', [59824, 1.98319352, 0.55932823, 12.44219, 137.65957, 291.23867, '20220710.94027']);
    comets.set('P/2022_R1_(P', [59831, 3.56692622, 0.50227847, 7.40821, 222.76039, 176.17553, '20231013.03893']);
    comets.set('P/2022_R4_(P', [59846, 1.95555937, 0.49032771, 21.02148, 197.43182, 176.62311, '20220710.38141']);
    comets.set('P/2022_R5_(P', [59858, 2.46966956, 0.19590552, 15.29228, 240.65441, 115.07481, '20220527.79355']);
    comets.set('P/2022_S1_(P', [59863, 3.15134211, 0.50837781, 34.58178, 262.74010, 136.09243, '20220819.09503']);
    comets.set('C/2022_S5_(P', [59858, 2.17875628, 0.89344106, 136.53082, 232.77584, 214.85607, '20221127.46360']);
    comets.set('P/2022_W1_(R', [59897, 3.36779264, 0.51657112, 13.46583, 17.80134, 38.81587, '20220915.79866']);
    const selcom = document.getElementById('comet');
    comets.forEach((v, i) => {
        if (!(i === 'Name' || i === 'Title' || i === 'units')) {
            let opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = i;
            selcom.appendChild(opt);
        }
    });
});