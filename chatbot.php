function chatbot_shortcode() {
	ob_start();
	?>
	<!-- Icon Chat -->
	<div id="chat-icon" onclick="toggleChat()">
		<img src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png" alt="Chat" />
	</div>

	<!-- Giao diện Chatbot -->
	<div id="chatbot-container" style="display: none;">
		<div id="chatbot-sidebar">
			<h3>Lịch sử Chat</h3>
			<ul id="chat-history">
				<!-- Lịch sử chat sẽ được thêm vào đây -->
			</ul>
			<button id="new-chat">Cuộc trò chuyện mới</button>
		</div>
		<!-- Khung Chat -->
		<div id="chat-window">
			<!-- Header -->
			<div id="chat-header">
				<div class="chat-header-left">
					<img src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png" alt="Chat Icon">
					<span>AI ChatBot</span>
				</div>
				<div class="chat-header-right" onclick="toggleChat()">×</div>
			</div>

			<!-- Messages -->
			<div id="chat-messages"></div>

			<!-- Input -->
			<div id="chat-input">
				<input type="text" id="question" placeholder="Nhập tin nhắn...">
				<button id="send-message">Gửi</button>
			</div>
		</div>
	</div>

	<style>
		/* Icon Chat */
		#chat-icon {
			position: fixed;
			bottom: 20px;
			right: 20px;
			width: 60px;
			height: 60px;
			background: #007bff;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
			z-index: 9999;
		}

		#chat-icon img {
			width: 40px;
			height: 40px;
			object-fit: cover;
		}

		/* Giao diện Chatbot */
		#chatbot-container {
			width: 600px; /* Tăng chiều rộng để chứa sidebar */
			height: 500px;
			border-radius: 15px;
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
			position: fixed;
			bottom: 100px;
			right: 20px;
			background: #fff;
			display: flex;
			overflow: hidden;
			z-index: 9998;
			font-family: Arial, sans-serif;
		}

		/* Sidebar */
		#chatbot-sidebar {
			width: 200px; /* Chiều rộng của sidebar */
			border-right: 1px solid #ddd;
			padding: 10px;
			background: #f1f1f1;
			overflow-y: auto;
		}

		#chatbot-sidebar h3 {
			margin: 0 0 10px;
			font-size: 16px;
		}

		#chatbot-sidebar ul {
			list-style: none;
			padding: 0;
			margin: 0;
		}

		#chatbot-sidebar li {
			padding: 5px;
			cursor: pointer;
			transition: background 0.3s;
		}

		#chatbot-sidebar li:hover {
			background: #eaeaea;
		}

		#new-chat {
			margin-top: 10px;
			padding: 10px;
			background: #007bff;
			color: white;
			border: none;
			border-radius: 5px;
			cursor: pointer;
			transition: background 0.3s;
			width: 100%;
		}

		#new-chat:hover {
			background: #0056b3;
		}

		/* Khung Chat */
		#chat-window {
			flex: 1;
			display: flex;
			flex-direction: column;
		}

		#chat-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px;
			background: #007bff;
			color: white;
			font-size: 16px;
		}

		.chat-header-left img {
			width: 30px;
			height: 30px;
			margin-right: 10px;
		}

		.chat-header-right {
			cursor: pointer;
			font-size: 20px;
		}

		#chat-messages {
			flex: 1;
			padding: 15px;
			overflow-y: auto;
			background: #f9f9f9;
		}

		/* Tin nhắn */
		.message-wrapper {
			display: flex;
			margin: 8px 0;
		}

		/* Tin nhắn của bot */
		.message.bot {
			background: #eaeaea;
			color: black;
			border-radius: 10px;
			border-top-left-radius: 0;
			padding: 10px 15px;
			font-size: 14px;
			line-height: 1.5;
			max-width: 75%;
			word-wrap: break-word;
			align-self: flex-start;
		}

		.message-wrapper.bot {
			justify-content: flex-start;
		}

		/* Tin nhắn của người dùng */
		.message.user {
			background: #007bff;
			color: white;
			border-radius: 10px;
			border-top-right-radius: 0;
			padding: 10px 15px;
			font-size: 14px;
			line-height: 1.5;
			max-width: 75%;
			word-wrap: break-word;
			align-self: flex-end;
		}

		.message-wrapper.user {
			justify-content: flex-end;
		}

		#chat-input {
			display: flex;
			padding: 10px;
			background: #fff;
			border-top: 1px solid #ddd;
		}

		#chat-input input {
			flex: 1;
			padding: 10px;
			border: 1px solid #ddd;
			border-radius: 20px;
			font-size: 14px;
			outline: none;
		}

		#chat-input button {
			margin-left: 10px;
			padding: 10px 15px;
			border: none;
			background: #007bff;
			color: white;
			border-radius: 20px;
			font-size: 14px;
			cursor: pointer;
			transition: 0.3s;
		}

		#chat-input button:hover {
			background: #0056b3;
		}

		/* Loading dots */
		.loading-dots {
			display: inline-block;
			font-size: 20px;
			color: #007bff;
		}

		.dot {
			animation: blink 1.5s infinite;
		}

		.dot:nth-child(1) { animation-delay: 0s; }
		.dot:nth-child(2) { animation-delay: 0.3s; }
		.dot:nth-child(3) { animation-delay: 0.6s; }

		@keyframes blink {
			0%, 100% { opacity: 0; }
			50% { opacity: 1; }
		}
	</style>

	<script>
		const chatHistories = [];

		function toggleChat() {
			const chatContainer = document.getElementById('chatbot-container');
			chatContainer.style.display = chatContainer.style.display === 'none' ? 'flex' : 'none';
		}

		function addChatHistory(chatId, message) {
			const historyList = document.getElementById('chat-history');
			const historyItem = document.createElement('li');
			historyItem.textContent = `Cuộc trò chuyện ${chatId}`;
			historyItem.onclick = () => loadChatHistory(chatId);
			historyList.appendChild(historyItem);
			chatHistories[chatId] = [message]; // Khởi tạo lịch sử với tin nhắn đầu tiên
		}

		function loadChatHistory(chatId) {
			const chatMessages = document.getElementById('chat-messages');
			chatMessages.innerHTML = ''; // Xóa tin nhắn hiện tại

			// Hiển thị lại các tin nhắn trong lịch sử
			chatHistories[chatId].forEach(msg => {
				const userWrapper = document.createElement('div');
				userWrapper.classList.add('message-wrapper', 'user');
				const userMessageDiv = document.createElement('div');
				userMessageDiv.classList.add('message', 'user');
				userMessageDiv.textContent = msg; // Hiển thị tin nhắn đã chọn
				userWrapper.appendChild(userMessageDiv);
				chatMessages.appendChild(userWrapper);
			});

			chatMessages.scrollTop = chatMessages.scrollHeight; // Cuộn xuống dưới
		}

		document.addEventListener('DOMContentLoaded', function () {
			const sendMessageButton = document.getElementById('send-message');
			const userInputField = document.getElementById('question');
			const chatMessages = document.getElementById('chat-messages');

			let currentChatId = 0; // ID cho cuộc trò chuyện hiện tại

			function scrollToBottom() {
				chatMessages.scrollTop = chatMessages.scrollHeight;
			}

			sendMessageButton.addEventListener('click', () => {
				const userMessage = userInputField.value.trim();
				if (!userMessage) return;

				// Hiển thị tin nhắn của người dùng
				const userWrapper = document.createElement('div');
				userWrapper.classList.add('message-wrapper', 'user');
				const userMessageDiv = document.createElement('div');
				userMessageDiv.classList.add('message', 'user');
				userMessageDiv.textContent = userMessage;
				userWrapper.appendChild(userMessageDiv);
				chatMessages.appendChild(userWrapper);
				
				// Ghi lại lịch sử chat
				if (!chatHistories[currentChatId]) {
					chatHistories[currentChatId] = [];
				}
				chatHistories[currentChatId].push(userMessage);
				scrollToBottom();

				// Hiển thị bot đang trả lời
				const botWrapper = document.createElement('div');
				botWrapper.classList.add('message-wrapper', 'bot');
				const botMessageDiv = document.createElement('div');
				botMessageDiv.classList.add('message', 'bot');
				botMessageDiv.innerHTML = '<div class="loading-dots"><span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></div>';
				botWrapper.appendChild(botMessageDiv);
				chatMessages.appendChild(botWrapper);

				scrollToBottom();

				fetch('http://103.116.53.18:5001/api/v1/question', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ question: userMessage }),
				})
					.then((response) => response.json())
					.then((data) => {
						botMessageDiv.innerHTML = '';
						typeResponse(botMessageDiv, data.response);
						chatHistories[currentChatId].push(data.response); // Ghi lại tin nhắn bot
						scrollToBottom();
					})
					.catch(() => {
						botMessageDiv.innerHTML = 'Hệ thống đang bảo trì, vui lòng thử lại sau.';
						scrollToBottom();
					});

				userInputField.value = '';
			});

			userInputField.addEventListener('keydown', (event) => {
				if (event.key === 'Enter') sendMessageButton.click();
			});

			// Thêm sự kiện cho nút "Cuộc trò chuyện mới"
			document.getElementById('new-chat').addEventListener('click', () => {
				currentChatId++;
				addChatHistory(currentChatId, ''); // Thêm cuộc trò chuyện mới vào lịch sử
				loadChatHistory(currentChatId); // Tải cuộc trò chuyện mới
			});
		});

		function typeResponse(element, text, delay = 20) {
			let index = 0;
			const interval = setInterval(() => {
				if (index < text.length) {
					element.innerHTML += text[index];
					index++;
				} else {
					clearInterval(interval);
				}
			}, delay);
		}
	</script>
	<?php
	return ob_get_clean();
}
add_shortcode('chatbot', 'chatbot_shortcode');