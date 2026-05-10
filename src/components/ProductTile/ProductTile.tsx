import { Button } from '../Button';
import styles from './ProductTile.module.css';

export interface ProductTileProps {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  outOfStock?: boolean;
  loading?: boolean;
  compact?: boolean;
}

export function ProductTile({
  name,
  description,
  price,
  originalPrice,
  outOfStock = false,
  loading = false,
  compact = false,
}: ProductTileProps) {
  if (loading) {
    return (
      <article className={styles.tile} aria-busy="true">
        <div className={styles.skeletonImage} aria-hidden="true" />
        <div className={styles.skeletonLine} aria-hidden="true" />
        <div className={styles.skeletonLineShort} aria-hidden="true" />
      </article>
    );
  }

  const hasDiscount = typeof originalPrice === 'number' && originalPrice > price;

  return (
    <article className={[styles.tile, compact ? styles.compact : ''].join(' ')}>
      <div className={styles.imageWrap} aria-hidden="true">
        <span className={styles.badge}>{hasDiscount ? 'Sale' : 'Featured'}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.priceRow}>
          <strong className={styles.price}>${price.toFixed(2)}</strong>
          {hasDiscount ? <span className={styles.originalPrice}>${originalPrice?.toFixed(2)}</span> : null}
        </div>
        <Button variant={outOfStock ? 'secondary' : 'primary'} disabled={outOfStock}>
          {outOfStock ? 'Out of stock' : 'Add to cart'}
        </Button>
      </div>
    </article>
  );
}
