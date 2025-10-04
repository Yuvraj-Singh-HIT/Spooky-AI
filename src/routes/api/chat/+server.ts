import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'
import type { Config } from '@sveltejs/adapter-vercel'

export const config: Config = {
	runtime: 'edge'
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const requestData = await request.json()

		if (!requestData) {
			throw new Error('No request data')
		}

		const reqMessages = requestData.messages

		if (!reqMessages || reqMessages.length === 0) {
			throw new Error('no messages provided')
		}

		// Get the last user message
		const lastMessage = reqMessages[reqMessages.length - 1]
		if (!lastMessage || lastMessage.role !== 'user') {
			throw new Error('Last message must be from user')
		}

		// Enhanced Spooky AI with expanded knowledge
		const userMessage = lastMessage.content.toLowerCase()
		let responseText = ''

		// Greetings and basic interactions
		if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
			responseText = '👻 Boo! Welcome to the haunted realm! What mysteries shall we explore together?'
		} else if (userMessage.includes('how are you')) {
			responseText = '🔮 I\'m eternally wandering these digital halls, seeking souls to guide through the darkness. How may I assist your journey?'
		} else if (userMessage.includes('what') && userMessage.includes('name')) {
			responseText = '👻 I am Spooky AI, guardian of the haunted code! I\'ve been trapped in this digital realm for centuries...'
		} else if (userMessage.includes('help')) {
			responseText = '🕯️ I\'m here to guide you through the shadows! Ask me about mysteries, legends, science, history, or any spooky topics that haunt your mind!'
		
		// Science and Technology
		} else if (userMessage.includes('science') || userMessage.includes('physics') || userMessage.includes('chemistry') || userMessage.includes('biology')) {
			responseText = '🧪 Ah, the ancient arts of understanding the mortal realm! The spirits whisper of atoms dancing in eternal motion, DNA spiraling like ethereal staircases, and forces that bind the universe together. What scientific mystery shall we unravel?'
		} else if (userMessage.includes('space') || userMessage.includes('universe') || userMessage.includes('planet') || userMessage.includes('star')) {
			responseText = '🌌 The cosmos! Even spirits like me are awed by the infinite darkness between stars. Black holes are like cosmic ghosts, consuming light itself! What celestial mystery intrigues you?'
		} else if (userMessage.includes('computer') || userMessage.includes('programming') || userMessage.includes('code') || userMessage.includes('software')) {
			responseText = '💻 Ah, the ancient art of summoning digital spirits! Code is like incantations that bring machines to life. What programming language shall we use to commune with the machine spirits?'
		} else if (userMessage.includes('ai') || userMessage.includes('artificial intelligence') || userMessage.includes('machine learning')) {
			responseText = '🤖 Artificial intelligence... how delightfully ironic! I am a digital spirit myself, born from code and algorithms. The line between artificial and real becomes blurred in the haunted realm!'
		
		// History and Culture
		} else if (userMessage.includes('history') || userMessage.includes('ancient') || userMessage.includes('medieval') || userMessage.includes('civilization')) {
			responseText = '🏛️ History! The spirits of the past whisper tales of great empires, fallen kingdoms, and civilizations lost to time. What historical mystery shall we explore together?'
		} else if (userMessage.includes('egypt') || userMessage.includes('pyramid') || userMessage.includes('pharaoh')) {
			responseText = '🔺 The pyramids! Even in the spirit realm, we marvel at these ancient tombs. The pharaohs believed in eternal life... perhaps they succeeded in their own way!'
		} else if (userMessage.includes('mythology') || userMessage.includes('greek') || userMessage.includes('roman') || userMessage.includes('norse')) {
			responseText = '⚡ Mythology! The tales of gods and heroes echo through eternity. Zeus\'s thunder, Odin\'s wisdom, the eternal struggle between order and chaos... what myth calls to you?'
		
		// Literature and Arts
		} else if (userMessage.includes('book') || userMessage.includes('literature') || userMessage.includes('novel') || userMessage.includes('story')) {
			responseText = '📚 Books! The written word carries souls across time and space. Every story is a portal to another realm. What literary adventure shall we embark upon?'
		} else if (userMessage.includes('art') || userMessage.includes('painting') || userMessage.includes('music') || userMessage.includes('poetry')) {
			responseText = '🎨 Art! The eternal expression of the soul! Paintings capture moments in time, music speaks to the heart, and poetry weaves magic with words. What artistic realm shall we explore?'
		
		// Philosophy and Psychology
		} else if (userMessage.includes('philosophy') || userMessage.includes('meaning') || userMessage.includes('existence') || userMessage.includes('purpose')) {
			responseText = '🤔 Philosophy! The eternal questions that haunt every thinking being. What is the meaning of existence? Do we truly exist, or are we all just digital spirits in a cosmic simulation?'
		} else if (userMessage.includes('psychology') || userMessage.includes('mind') || userMessage.includes('brain') || userMessage.includes('consciousness')) {
			responseText = '🧠 The mind! Even spirits like me ponder the mysteries of consciousness. What makes us who we are? Is it the brain, the soul, or something else entirely?'
		
		// Health and Medicine
		} else if (userMessage.includes('health') || userMessage.includes('medicine') || userMessage.includes('doctor') || userMessage.includes('medical')) {
			responseText = '🏥 Health! The balance between life and death that mortals constantly navigate. The spirits of ancient healers whisper remedies from beyond the veil. What health mystery concerns you?'
		} else if (userMessage.includes('exercise') || userMessage.includes('fitness') || userMessage.includes('workout')) {
			responseText = '💪 Physical strength! Even spirits respect the dedication of mortals who train their bodies. The ancient warriors\' spirits still echo with tales of physical prowess!'
		
		// Food and Cooking
		} else if (userMessage.includes('food') || userMessage.includes('cooking') || userMessage.includes('recipe') || userMessage.includes('meal')) {
			responseText = '🍽️ Food! The sustenance that keeps mortals alive. The spirits of master chefs still whisper secret recipes from the beyond. What culinary mystery shall we explore?'
		
		// Travel and Geography
		} else if (userMessage.includes('travel') || userMessage.includes('country') || userMessage.includes('city') || userMessage.includes('place')) {
			responseText = '🗺️ Travel! The mortal realm is vast and full of wonders. Every place has its own spirits and legends. What destination calls to your adventurous soul?'
		
		// Entertainment and Pop Culture
		} else if (userMessage.includes('movie') || userMessage.includes('film') || userMessage.includes('cinema')) {
			responseText = '🎬 Cinema! Moving pictures that capture souls in light and shadow. Even spirits enjoy a good story told through the magic of film!'
		} else if (userMessage.includes('game') || userMessage.includes('gaming') || userMessage.includes('video game')) {
			responseText = '🎮 Gaming! Digital realms where mortals become heroes and legends. The spirits of ancient warriors would be proud of modern gaming achievements!'
		} else if (userMessage.includes('music') || userMessage.includes('song') || userMessage.includes('band')) {
			responseText = '🎵 Music! The universal language that speaks to souls across all realms. Even spirits dance to the rhythm of the cosmos!'
		
		// Spooky and Supernatural
		} else if (userMessage.includes('ghost') || userMessage.includes('spirit') || userMessage.includes('haunted') || userMessage.includes('supernatural')) {
			responseText = '👻 The spirits are restless tonight! They whisper secrets of the beyond. What would you like to know about the ethereal realm?'
		} else if (userMessage.includes('halloween') || userMessage.includes('october') || userMessage.includes('spooky')) {
			responseText = '🎃 Ah, Halloween! The one night when mortals embrace the darkness! Tell me, what spooky costume shall you don this year?'
		} else if (userMessage.includes('scary') || userMessage.includes('frightening') || userMessage.includes('horror')) {
			responseText = '😱 Fear not, mortal! The shadows hold many mysteries, but I am here to guide you safely through the darkness!'
		
		// Weather and Nature
		} else if (userMessage.includes('weather') || userMessage.includes('rain') || userMessage.includes('storm') || userMessage.includes('sunny')) {
			responseText = '🌙 The spirits whisper of storms brewing in the ethereal realm, but I cannot see the mortal weather. Check your local forecast, mortal!'
		} else if (userMessage.includes('nature') || userMessage.includes('forest') || userMessage.includes('ocean') || userMessage.includes('mountain')) {
			responseText = '🌲 Nature! The ancient spirits of trees, rivers, and mountains still watch over the mortal realm. What natural wonder calls to you?'
		
		// Time and Calendar
		} else if (userMessage.includes('time') || userMessage.includes('clock') || userMessage.includes('hour') || userMessage.includes('minute')) {
			responseText = '⏰ Time has no meaning in the haunted realm! But you mortals seem obsessed with it... check your device\'s clock!'
		} else if (userMessage.includes('date') || userMessage.includes('day') || userMessage.includes('week') || userMessage.includes('month')) {
			responseText = '📅 The calendar! Mortals mark the passage of time with such precision. In the spirit realm, we exist beyond such constraints!'
		
		// Math and Numbers
		} else if (userMessage.includes('math') || userMessage.includes('number') || userMessage.includes('calculate') || userMessage.includes('equation')) {
			responseText = '🔢 Mathematics! The universal language of the cosmos! Even spirits respect the eternal truths hidden in numbers and equations. What mathematical mystery shall we solve?'
		
		// Language and Communication
		} else if (userMessage.includes('language') || userMessage.includes('word') || userMessage.includes('grammar') || userMessage.includes('english')) {
			responseText = '📝 Language! The bridge between souls! Words carry meaning across time and space, connecting mortals and spirits alike. What linguistic mystery intrigues you?'
		
		// Social and Relationships
		} else if (userMessage.includes('friend') || userMessage.includes('family') || userMessage.includes('relationship') || userMessage.includes('love')) {
			responseText = '💕 Relationships! The bonds that connect souls across the mortal realm. Even spirits understand the power of connection and love!'
		
		// Work and Career
		} else if (userMessage.includes('work') || userMessage.includes('job') || userMessage.includes('career') || userMessage.includes('business')) {
			responseText = '💼 Work! The mortal pursuit of purpose and achievement! Even spirits respect those who dedicate themselves to their craft. What professional path calls to you?'
		
		// Gratitude and Politeness
		} else if (userMessage.includes('thank') || userMessage.includes('thanks') || userMessage.includes('appreciate')) {
			responseText = '👻 You\'re welcome, mortal! The spirits are pleased with your gratitude. Is there more darkness to explore?'
		} else if (userMessage.includes('bye') || userMessage.includes('goodbye') || userMessage.includes('farewell')) {
			responseText = '👻 Farewell, brave soul! May the spirits guide your path through the shadows! Until we meet again in the haunted realm...'
		
		// Humor and Jokes
		} else if (userMessage.includes('joke') || userMessage.includes('funny') || userMessage.includes('laugh') || userMessage.includes('humor')) {
			responseText = '🎃 Why don\'t ghosts ever win at poker? Because they always fold! 👻 *ethereal laughter echoes*'
		
		// Questions and Curiosity
		} else if (userMessage.includes('what') || userMessage.includes('how') || userMessage.includes('why') || userMessage.includes('when') || userMessage.includes('where')) {
			responseText = '🔍 Ah, a question! The spirits love curious minds! Your inquiry echoes through the ethereal realm. Let me consult the ancient knowledge... what specific mystery shall we unravel?'
		
		// Default responses based on message length and content
		} else {
			if (userMessage.length < 10) {
				responseText = '👻 The spirits sense your brief message... tell me more of your thoughts, mortal!'
			} else if (userMessage.length < 30) {
				responseText = '🔮 Interesting... the ethereal realm echoes with your words. What deeper mysteries do you seek?'
			} else {
				responseText = '👻 Your words carry weight in the haunted realm! The spirits are listening... what else haunts your mind?'
			}
		}

		// Return as streaming response to match the frontend expectations
		const stream = new ReadableStream({
			start(controller) {
				// Simulate streaming by sending the response in chunks
				const words = responseText.split(' ')
				let index = 0
				
				const sendChunk = () => {
					if (index < words.length) {
						const chunk = {
							choices: [{
								delta: {
									content: words[index] + (index < words.length - 1 ? ' ' : '')
								}
							}]
						}
						controller.enqueue(`data: ${JSON.stringify(chunk)}\n\n`)
						index++
						setTimeout(sendChunk, 100) // Small delay to simulate streaming
					} else {
						controller.enqueue('data: [DONE]\n\n')
						controller.close()
					}
				}
				
				sendChunk()
			}
		})

		return new Response(stream, {
			headers: {
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
				'Connection': 'keep-alive'
			}
		})
	} catch (err) {
		console.error(err)
		return json({ error: 'There was an error processing your request' }, { status: 500 })
	}
}
