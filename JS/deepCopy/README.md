# deepCopy(深拷贝)

思路：

1. 创建map，以解决循环引用问题。
2. 判断数据类型，通过策略模式，不同类型采用不同的拷贝方式，其中数组和对象的拷贝方式一致。 
3. 创建拷贝对象，循环遍历原始对象的每个属性与值，递归赋值。
4. 根据原始对象类型，选择采用策略模式，并返回拷贝对象。