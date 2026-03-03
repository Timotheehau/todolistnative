import { View, StyleSheet, Text, TextInput, TouchableOpacity, FlatList, Alert} from 'react-native'
import {useState} from 'react'

const TodoList = () => {
    const [task, setTask] = useState('')
    const [todoList, setTodoList] = useState([])
    const [editingId, setEditingId] = useState(null)

    const addTasks = () => {
        // on empeche de mettre des espaces vides
        if (task.trim().length === 0) return
        // le mode update
        if (editingId) {
            setTodoList(todoList.map(item =>
            item.id === editingId ? { ...item, name: task } : item
            ))
            setEditingId(null)
        } else {
            // la création
            const newTask = {
                id: Date.now().toString(),
                name: task,
                completed: false,
            }
            setTodoList([newTask, ...todoList])
        }
        setTask('')
    }

    const statusTasks = (id) => {
        setTodoList(todoList.map(item =>
        item.id === id ? {...item, completed: !item.completed } : item
        ))
    }
    // ici on rend l'editingId à true
    const editTasks = (item) => {
        setTask(item.name)
        setEditingId(item.id)
    }
    const deleteTasks = (id) => {
        setTodoList(todoList.filter((item) => item.id !== id))
    }



    const renderItem = ({ item }) => (
        <View style={styles.taskContainer}>
            <TouchableOpacity
                style={styles.taskTextContainer}
                onPress={() => statusTasks(item.id)}
            >
                <Text style={[styles.taskText, item.completed && styles.completedText]}>
                    {item.completed ? "✅ " : "⏳ "}{item.name}
                </Text>
            </TouchableOpacity>

            <View style={styles.buttons}>
                <TouchableOpacity onPress={() => editTasks(item)} style={styles.editButton}>
                    <Text style={styles.buttonText}>Modifier</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deleteTasks(item.id)} style={styles.deleteButton}>
                    <Text style={styles.buttonText}>X</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ma Liste de Tâches</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nouvelle tâche..."
                    value={task}
                    onChangeText={(text) => setTask(text)}
                />
                <TouchableOpacity style={styles.addButton} onPress={addTasks}>
                    <Text style={styles.addButtonText}>{editingId ? "OK" : "+"}</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={todoList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text style={styles.emptyText}>Aucune tâche pour le moment.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333', textAlign: 'center' },
    inputContainer: { flexDirection: 'row', marginBottom: 20 },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    addButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        width: 50,
    },
    addButtonText: { color: '#white', fontWeight: 'bold', textAlign: 'center' },
    taskContainer: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 2,
    },
    taskTextContainer: { flex: 1 },
    taskText: { fontSize: 16, color: '#333' },
    completedText: { textDecorationLine: 'line-through', color: 'gray' },
    buttons: { flexDirection: 'row' },
    editButton: { backgroundColor: '#FFCC00', padding: 8, borderRadius: 5, marginRight: 5 },
    deleteButton: { backgroundColor: '#FF3B30', padding: 8, borderRadius: 5 },
    buttonText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
    emptyText: { textAlign: 'center', marginTop: 50, color: '#999' }
})


export default TodoList