const lib = require("lib")({ token: process.env.STDLIB_SECRET_TOKEN });
const { indicators } = require("./extra.js");

module.exports = class {
  constructor(channel_id, message_id) {
    this.channel_id = channel_id;
    this.message_id = message_id ?? undefined;
  }

  async getData() {
    return await lib.http.request["@1.1.6"].get({
      url: `https://discordstatus.com/api/v2/summary.json`,
    });
  }

  nl(number = 1) {
    return "\n".repeat(number);
  }

  getIcon(input) {
    switch (input) {
      case "unknown":
        return indicators.unknown.icon;
      case "none":
        return indicators.none.icon;
      case "operational":
        return indicators.none.icon;
      case "minor":
        return indicators.minor.icon;
      case "scheduled":
        return indicators.minor.icon;
      case "partial_outage":
        return indicators.minor.icon;
      case "major":
        return indicators.major.icon;
      case "major_outage":
        return indicators.major.icon;
      case "in_progress":
        return indicators.major.icon;
      case "critical":
        return indicators.critical.icon;
      default:
        return indicators.unknown.icon;
    }
  }

  getColor(input) {
    switch (input) {
      case "none":
        return indicators.none.color;
      case "minor":
        return indicators.minor.color;
      case "major":
        return indicators.major.color;
      case "critical":
        return indicators.critical.color;
      default:
        return indicators.none.color;
    }
  }

  async isIncident() {
    const { data } = await this.getData();
    return data.status.indicator !== "none" ? true : false;
  }

  genEmbed(data) {
    const fields = [];
    const incidents =
      data.incidents != 0
        ? {
            name: "Incidents",
            inline: false,
            value: data.incidents
              .map(
                (item) =>
                  `${indicators.unknown.icon} [${item.name}](${item.shortlink})`
              )
              .join(this.nl(1)),
          }
        : undefined;
    const maintanance =
      data.scheduled_maintenances != 0
        ? {
            name: "Scheduled Maintenances",
            inline: false,
            value: data.scheduled_maintenances
              .map(
                (item) =>
                  `${this.getIcon(item.status)}[${item.name}](${
                    item.shortlink
                  })`
              )
              .join(this.nl(1)),
          }
        : undefined;
    const services = {
      name: data.page.name + " Services",
      inline: false,
      value: data.components
        .map((item) => {
          if (item.name != "Visit www.discordstatus.com for more information") {
            return `${this.getIcon(item.status)} ${item.name}`;
          } else return null;
        })
        .filter((item) => item !== null)
        .join(this.nl(1)),
    };
    if (incidents !== undefined) {
      fields.push(incidents);
    }
    if (maintanance !== undefined) {
      fields.push(maintanance);
    }
    fields.push(services);
    return [
      {
        rich: true,
        title: `${this.getIcon(data.status.indicator)} ${
          data.page.name
        } Status`,
        description: `${data.status.description}\nVisit [${data.page.name} Status](${data.page.url}) for details`,
        color: this.getColor(data.status.indicator),
        fields,
      },
    ];
  }

  async sendMessage() {
    const msgData = await this.genMsgData();
    return await lib.http.request["@1.1.6"].post({
      url: `https://discord.com/api/channels/` + this.channel_id + `/messages`,
      headers: {
        authorization: `Bot ${process.env.bot_token}`,
        "Content-Type": "application/json",
      },
      params: {
        channel_id: ``,
        ...msgData,
      },
    });
  }

  async editMessage() {
    const msgData = await this.genMsgData();
    return await lib.http.request["@1.1.6"].post({
      url:
        `https://discord.com/api/channels/` +
        this.channel_id +
        `/messages` +
        this.message_id,
      headers: {
        authorization: `Bot ${process.env.bot_token}`,
        "Content-Type": "application/json",
      },
      params: {
        channel_id: ``,
        ...msgData,
      },
    });
  }

  async genMsgData() {
    const { data } = await this.getData();

    const embeds = this.genEmbed(data);

    const all = `${data.status.description}`;

    return {
      content: "",
      embeds,
      tts: false,
    };
  }
};
