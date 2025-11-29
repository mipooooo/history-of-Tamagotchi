
document.getElementById('newTopicBtn').addEventListener('click', () => {
    document.getElementById('newTopicModal').style.display = 'block';
});

function closeNewTopicModal() {
    document.getElementById('newTopicModal').style.display = 'none';
}

document.getElementById('newTopicForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('topicTitle').value;
    const content = document.getElementById('topicContent').value;
    const author = document.getElementById('topicAuthor').value;

    alert(`Тема "${title}" успешно создана!`);

    this.reset();
    closeNewTopicModal();

    


});