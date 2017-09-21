## react.js拖拽排序功能的实现

### 1.使用 react-dnd

```bash
npm install--save react-dnd
npm install--save react-dnd-html5-backend
```
### 2.拖拽源，拖拽目标

```bash

import { DragSource, DropTarget } from 'react-dnd';

```

```bash

export default flow(
  DragSource(ItemTypeR, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget(ItemTypeR, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
  }))
)(Select);

```

### 3. 拖动上下文，被@DragDropContext(HTML5Backend)装饰

```bash

export default DragDropContext(HTML5Backend)(SelectContainer);

```

同一个组件中不能有两个 DragDropContext
参考连接：https://www.npmjs.com/package/react-dnd
