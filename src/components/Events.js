

export default function Events() {
  return (
    <section id="events" className="bg-[#101b2d] text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-14 text-center animate-fade-in">Upcoming Events</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Double EXP Weekend",
              description: "Level up faster this weekend! Enjoy double EXP on all monsters. Starts Friday 6PM server time.",
              icon: "⚡"
            },
            {
              title: "Guild Siege Tournament",
              description: "Test your guild’s power in our PvP siege tournament. Prizes for the top 3 guilds!",
              icon: "🏆"
            },
            {
              title: "Treasure Hunt",
              description: "Join the event and find hidden chests scattered across Madrigal to win rare items and more.",
              icon: "🧭"
            }
          ].map((event, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-[#1b2b44] to-[#0e1a2b] p-6 rounded-xl shadow-lg hover:scale-105 transition-transform border border-white/10 animate-fade-in-up"
            >
              <div className="text-4xl mb-3 animate-bounce">{event.icon}</div>
              <h3 className="text-xl font-bold text-yellow-400 mb-2">{event.title}</h3>
              <p className="text-sm text-gray-300">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}