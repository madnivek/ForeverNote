# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Note.destroy_all

# USERS

harry_potter = User.create!(
  username: "boy_who_lived",
  email: "harryjpotter@hogwards.edu",
  password: "up_to_no_good"
)

hermione_granger = User.create!(
  username: "know_it_all",
  email: "hermionejgranger@hogwards.edu",
  password: "iloveronweasley"
)

ron_weasley = User.create!(
  username: "mediocre_ginger",
  email: "ronbweasley@hogwards.edu",
  password: "iloveronweasley"
)

demouser = User.create!(
  username: "harry",
  email: "harry@gmail.com",
  password: "potter"
)
#NOTES

def fake_title
  Faker::HarryPotter.quote
end

note_1 = Note.create!(author_id: demouser.id,
notebook_id: 1,
title: "Harry's Chamber of Secrets",
body: <<-TEXT

{"entityMap":{},"blocks":[{"key":"8f43o","text":"Toad-like smile Flourish and Blotts he knew I’d come back Quidditch World Cup. Fat Lady baubles banana fritters fairy lights Petrificus Totalus. So thirsty, deluminator firs’ years follow me 12 inches of parchment. Head Boy start-of-term banquet Cleansweep Seven roaring lion hat. Unicorn blood crossbow mars is bright tonight, feast Norwegian Ridgeback. Come seek us where our voices sound, we cannot sing above the ground, Ginny Weasley bright red. Fanged frisbees, phoenix tears good clean match.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"29kho","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"eb70f","text":"Boggarts lavender robes, Hermione Granger Fantastic Beasts and Where to Find Them. Bee in your bonnet Hand of Glory elder wand, spectacles House Cup Bertie Bott’s Every Flavor Beans Impedimenta. Stunning spells tap-dancing spider Slytherin’s Heir mewing kittens Remus Lupin. Palominos scarlet train black robes, Metamorphimagus Niffler dead easy second bedroom. Padma and Parvati Sorting Hat Minister of Magic blue turban remember my last.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"45u84","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"e0gmu","text":"Red hair crookshanks bludger Marauder’s Map Prongs sunshine daisies butter mellow Ludo Bagman. Beaters gobbledegook N.E.W.T., Honeydukes eriseD inferi Wormtail. Mistletoe dungeons Parseltongue Eeylops Owl Emporium expecto patronum floo powder duel. Gillyweed portkey, keeper Godric’s Hollow telescope, splinched fire-whisky silver Leprechaun O.W.L. stroke the spine. Chalice Hungarian Horntail, catherine wheels Essence of Dittany Gringotts Harry Potter. Prophecies Yaxley green eyes Remembrall horcrux hand of the servant. Devil’s snare love potion Ravenclaw, Professor Sinistra time-turner steak and kidney pie. Cabbage Daily Prophet letters from no one Dervish and Banges leg.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}

TEXT
)

#
# def fake_body
#   array = []
#   8.times do
#     array.push(Faker::HarryPotter.quote)
#   end
#
#   array.push("\n")
#   array.push("\n")
#
#   8.times do
#     array.push(Faker::HarryPotter.quote)
#   end
#
#   array.join(". ")
# end
#
# 8.times do
#   Note.create!(author_id: demouser.id, notebook_id: 1, title: fake_title, body: fake_body)
# end
