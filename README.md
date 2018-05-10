# react-ui-layout
React row/col layout components

```js
<Cols>
	<Col size={200} align='right' padding={16}>
		<div style={{backgroundColor: 'lightyellow', height: '100%'}}>A</div>
	</Col>
	<Col size={200} align='right' padding>
		<div style={{backgroundColor: 'lightgreen', height: '100%'}}>B</div>
	</Col>
	<Col size={100}>
		<Rows>
			<Row size={200}>
				C
			</Row>
			<Row align='bottom' size={100}>
				D
			</Row>
			<Row>
				E
			</Row>
		</Rows>
	</Col>
	<Col>
		F
	</Col>
</Cols>
```
