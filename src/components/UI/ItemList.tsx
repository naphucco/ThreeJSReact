import React, { useState } from 'react';
import styles from '../../Styles/ItemList.module.css';
import { itemOptions } from '../../configs/itemOptions';

interface ItemListProps {
  onDragStart: (e: React.DragEvent, itemId: string) => void;
  onDoubleClick: (itemId: string) => void;
}

function ItemList({ onDragStart, onDoubleClick }: ItemListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = itemOptions.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Search box */}
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.itemList}>
        {filteredItems.map((item: any) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => onDragStart(e, item.id)}
            onDoubleClick={() => onDoubleClick(item.id)}
            className={styles.itemCard}
          >
            <img src={item.thumbnail} alt={item.label} className={styles.itemImage} />
            <p className={styles.itemLabel}>{item.label}</p>
          </div>
        ))}
        {filteredItems.length === 0 && (
          <p className={styles.noResults}>No items found</p>
        )}
      </div>
    </>
  );
}

export default ItemList;