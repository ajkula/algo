const testResult = require('./testAnswers');

testResult([
  [isPathPossible, [{ CDG: ['JFK'], JFK: ['LAX'], LAX: ['CDG'] }, 'CDG', 'LAX'], true, "Test 1: Chemin dans une même SCC (Paris - Los Angeles)"],
  [isPathPossible, [{ HND: ['SFO'], SFO: ['NYC'], NYC: ['LHR'] }, 'HND', 'LHR'], true, "Test 2: Chemin linéaire (Tokyo - Londres)"],
  [isPathPossible, [{ DXB: ['IST'], IST: ['AMS'], AMS: ['DXB'], JFK: ['LAX'] }, 'DXB', 'LAX'], false, "Test 3: Pas de chemin entre différentes SCC (Dubaï - Los Angeles)"],
  [isPathPossible, [{ SYD: ['SIN'], SIN: ['BKK'], BKK: ['SYD'] }, 'BKK', 'SIN'], true, "Test 4: Pas de chemin en sens inverse (Bangkok - Singapour)"],
  [isPathPossible, [{}, 'NRT', 'ICN'], false, "Test 5: Graphe vide (Tokyo Narita - Séoul Incheon)"],
  [isPathPossible, [{ LHR: ['CDG'], CDG: ['LHR'] }, 'LHR', 'CDG'], true, "Test 6: Chemin simple aller-retour (Londres - Paris)"],
  [isPathPossible, [{ ATL: ['JFK'], JFK: ['LAX'], LAX: ['SEA'], SEA: ['ATL'] }, 'ATL', 'SEA'], true, "Test 7: Chemin circulaire (Atlanta - Seattle)"],
  [isPathPossible, [{ MIA: ['BOG'], BOG: ['LIM'], LIM: ['SCL'], SCL: ['MIA'], JFK: ['CDG'] }, 'MIA', 'CDG'], false, "Test 8: Aucun chemin direct entre deux SCC distinctes (Miami - Paris)"],
  [isPathPossible, [{ FRA: ['MUC'], MUC: ['ZRH'], ZRH: ['FRA'], LHR: ['CDG'], CDG: ['LHR'] }, 'FRA', 'LHR'], false, "Test 9: Pas de chemin entre deux groupes de SCC (Francfort - Londres)"],
  [isPathPossible, [{ NRT: ['ICN'], ICN: ['PVG'], PVG: ['NRT'], SFO: ['LAX'], LAX: ['SFO'] }, 'NRT', 'LAX'], false, "Test 10: Aucun chemin entre deux boucles de SCC distinctes (Tokyo Narita - Los Angeles)"]
]);

/**
    Exercice : Chemins Possibles entre Aéroports

    Problème : Étant donné un réseau d'aéroports réels et une liste 
    de vols directs entre ces aéroports, déterminez si un chemin est possible
    entre deux aéroports spécifiques.

    Entrée :
    Un graphe représentant le réseau d'aéroports, où chaque nœud
    est un code d'aéroport à trois lettres et chaque arête est un vol direct.
    Deux codes d'aéroports : source et destination.

    Sortie :
    true  -> si un chemin est possible entre la source et la destination.
    false -> si aucun chemin n'est possible.
*/

function isPathPossible(graph, departure, arrival) {
  if (Object.keys(graph).length === 0) {
    return false;
  }

  const sccs = kosaraju(graph);
  const sccGraph = buildSccGraph(graph, sccs);
  const departureScc = findSccContainingAirport(sccs, departure);
  const arrivalScc = findSccContainingAirport(sccs, arrival);

  if (departureScc === -1 || arrivalScc === -1) {
    return false;
  }
  
  return departureScc !== undefined && arrivalScc !== undefined && 
         hasPathInSccGraph(sccGraph, departureScc, arrivalScc);
}

function buildSccGraph(graph, sccs) {
  const sccGraph = {};
  sccs.forEach((scc, index) => {
    scc.forEach(airport => {
      graph[airport]?.forEach(destination => {
        const destinationScc = findSccContainingAirport(sccs, destination);
        if (destinationScc !== undefined && destinationScc !== index) {
          sccGraph[index] = sccGraph[index] || new Set();
          sccGraph[index].add(destinationScc);
        }
      });
    });
  });
  return sccGraph;
}

function findSccContainingAirport(sccs, airport) {
  return sccs.findIndex(scc => scc.has(airport));
}

function hasPathInSccGraph(sccGraph, startScc, endScc) {
  const visited = new Set();
  const stack = [startScc];

  while (stack.length) {
    const current = stack.pop();
    if (current === endScc) {
      return true;
    }
    visited.add(current);
    sccGraph[current]?.forEach(neighbour => {
      if (!visited.has(neighbour)) {
        stack.push(neighbour);
      }
    });
  }

  return false;
}

function kosaraju(graph) {
  const nodes = Object.keys(graph);
  const visited = new Set();
  const stack = [];
  const reversedGraph = reverseGraph(graph);
  const sccs = [];

  nodes.forEach(node => {
    if (!visited.has(node)) {
      fillOrder(node, visited, stack, graph);
    }
  });

  visited.clear();

  while (stack.length) {
    const node = stack.pop();
    if (!visited.has(node)) {
      const component = new Set();
      dfs(node, visited, component, reversedGraph);
      sccs.push(component);
    }
  }

  return sccs;
}

function fillOrder(node, visited, stack, graph) {
  visited.add(node);
  graph[node]?.forEach(neighbour => {
    if (!visited.has(neighbour)) {
      fillOrder(neighbour, visited, stack, graph);
    }
  });
  stack.push(node);
}

function dfs(node, visited, component, graph) {
  visited.add(node);
  component.add(node);
  graph[node]?.forEach(neighbour => {
    if (!visited.has(neighbour)) {
      dfs(neighbour, visited, component, graph);
    }
  });
}

function reverseGraph(graph) {
  const reversed = {};
  Object.keys(graph).forEach(node => {
    graph[node].forEach(neighbour => {
      reversed[neighbour] = reversed[neighbour] || [];
      reversed[neighbour].push(node);
    });
  });
  return reversed;
}