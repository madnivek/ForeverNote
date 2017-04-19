# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

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
  username: "demo",
  email: "demo@gmail.com",
  password: "demodemo"
)
