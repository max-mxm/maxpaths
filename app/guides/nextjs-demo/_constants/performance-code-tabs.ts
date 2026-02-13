export const PERFORMANCE_CODE_TABS = [
  {
    id: 'baseline',
    label: 'Sans optimisation',
    code: `function ProductList() {
  const [search, setSearch] = useState('');

  // Filtrage recalculé à chaque render
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Nouvelle fonction créée à chaque render
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <input onChange={handleSearch} />
      {filteredProducts.map(product => (
        // ProductItem re-render même si product n'a pas changé
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

// Composant Item non optimisé
function ProductItem({ product }) {
  const expensiveCalculation = () => {
    let result = 0;
    for (let i = 0; i < 100000; i++) {
      result += Math.random();
    }
    return result;
  };

  expensiveCalculation();
  return <div>{product.name}</div>;
}`,
    filename: 'baseline.tsx',
  },
  {
    id: 'memo',
    label: 'React.memo',
    code: `function ProductList() {
  const [search, setSearch] = useState('');

  // Toujours recalculé
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <input onChange={handleSearch} />
      {filteredProducts.map(product => (
        // ProductItemMemo ne re-render que si product change
        <ProductItemMemo key={product.id} product={product} />
      ))}
    </div>
  );
}

// Composant memoizé avec comparaison custom
const ProductItemMemo = memo(
  ({ product }) => {
    const expensiveCalculation = () => { /* ... */ };
    expensiveCalculation();
    return <div>{product.name}</div>;
  },
  (prevProps, nextProps) => prevProps.product.id === nextProps.product.id
);`,
    filename: 'with-memo.tsx',
  },
  {
    id: 'usememo',
    label: 'useMemo',
    code: `function ProductList() {
  const [search, setSearch] = useState('');

  // Filtrage memoizé, recalculé uniquement si search change
  const filteredProducts = useMemo(
    () => products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <input onChange={handleSearch} />
      {filteredProducts.map(product => (
        // ProductItem re-render à chaque fois
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}`,
    filename: 'with-usememo.tsx',
  },
  {
    id: 'optimized',
    label: 'Tout optimisé',
    code: `function ProductList() {
  const [search, setSearch] = useState('');

  // Filtrage memoizé
  const filteredProducts = useMemo(
    () => products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  // Handler memoizé avec useCallback
  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  return (
    <div>
      <input onChange={handleSearch} />
      {filteredProducts.map(product => (
        // ProductItemMemo memoizé
        <ProductItemMemo key={product.id} product={product} />
      ))}
    </div>
  );
}

// Composant fully optimized
const ProductItemMemo = memo(
  ({ product }) => {
    const expensiveCalculation = () => { /* ... */ };
    expensiveCalculation();
    return <div>{product.name}</div>;
  },
  (prevProps, nextProps) => prevProps.product.id === nextProps.product.id
);`,
    filename: 'fully-optimized.tsx',
  },
];
