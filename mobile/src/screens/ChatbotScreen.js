import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { COLORS, SIZES, globalStyles } from '../theme';
import { Send, Bot } from 'lucide-react-native';

export default function ChatbotScreen() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hi! I am Agro, your farming assistant. I can explain our AI freshness grading system (A, B, C, D, F) or help you pick the best produce. How can I help?', sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = { id: Date.now().toString(), text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    // Mock API response based on user input
    setTimeout(() => {
      let botReply = "I'm sorry, I didn't understand that. You can ask me about freshness grades!";
      const lowerInput = userMessage.text.toLowerCase();
      
      if (lowerInput.includes('grade a') || lowerInput.includes('a grade')) {
        botReply = "Grade A means the produce is premium, farm-fresh, perfectly shaped, and has optimal color/texture. It's the highest quality available.";
      } else if (lowerInput.includes('grade b') || lowerInput.includes('b grade')) {
        botReply = "Grade B produce is very good quality with minor cosmetic imperfections. It tastes just as good as Grade A but might not look picture-perfect.";
      } else if (lowerInput.includes('grade c')) {
        botReply = "Grade C indicates average quality. It's safe and nutritious but may have noticeable blemishes or shape irregularities.";
      } else if (lowerInput.includes('grade d')) {
        botReply = "Grade D produce is lower quality, often used for processing or cooking rather than eating raw. We rarely sell Grade D directly to consumers.";
      } else if (lowerInput.includes('grade f')) {
        botReply = "Grade F means the produce has failed quality checks and is rejected by AgroConnect. It may be spoiled or damaged.";
      } else if (lowerInput.includes('hi') || lowerInput.includes('hello')) {
        botReply = "Hello! How can I assist you with your farm-fresh shopping today?";
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: botReply, sender: 'bot' }]);
      setLoading(false);
    }, 1500);
  };

  const renderMessage = ({ item }) => {
    const isBot = item.sender === 'bot';
    return (
      <View style={[styles.messageWrapper, isBot ? styles.messageWrapperBot : styles.messageWrapperUser]}>
        {isBot && (
          <View style={styles.botAvatar}>
            <Bot color={COLORS.background} size={16} />
          </View>
        )}
        <View style={[styles.messageBubble, isBot ? styles.messageBubbleBot : styles.messageBubbleUser]}>
          <Text style={[styles.messageText, isBot ? styles.messageTextBot : styles.messageTextUser]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={globalStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatContainer}
      />
      
      {loading && (
        <View style={styles.typingIndicator}>
          <ActivityIndicator size="small" color={COLORS.primary} />
          <Text style={styles.typingText}>Agro is typing...</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask Agro about grades..."
          placeholderTextColor={COLORS.textSecondary}
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage} disabled={!inputText.trim()}>
          <Send color={inputText.trim() ? COLORS.background : COLORS.textSecondary} size={20} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    padding: SIZES.padding,
    paddingBottom: 20,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '85%',
  },
  messageWrapperUser: {
    alignSelf: 'flex-end',
  },
  messageWrapperBot: {
    alignSelf: 'flex-start',
  },
  botAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    alignSelf: 'flex-end',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
  },
  messageBubbleUser: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  messageBubbleBot: {
    backgroundColor: COLORS.surface,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  messageText: {
    fontSize: SIZES.body,
    lineHeight: 22,
  },
  messageTextUser: {
    color: COLORS.background,
    fontWeight: '500',
  },
  messageTextBot: {
    color: COLORS.text,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
    paddingTop: 0,
  },
  typingText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.small,
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: SIZES.padding,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    color: COLORS.text,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    minHeight: 40,
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  }
});
